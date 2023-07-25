require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const config = require('./config');

const users = require('./api/users');
const UsersService = require('./service/db/users/UsersService');
const UsersValidator = require('./validator/users');

const authentications = require('./api/auth');
const tokenManager = require('./tokenize/TokenManager');
const AuthenticationsService = require('./service/db/authentications/AuthenticationsService');
const AuthenticationsValidator = require('./validator/auth');

const savings = require('./api/savings');
const savingService = require('./service/db/savings/SavingsService');
const SavingsValidator = require('./validator/savings');

const _exports = require('./api/exports');
const ExportsService = require('./service/rabbitmq/ExportsService');
const ExportsValidator = require('./validator/exports');
const ClientError = require('./exceptions/client/ClientError');
const AuthenticationsError = require('./exceptions/client/AuthenticationsError');
const NotFoundError = require('./exceptions/client/NotFoundError');
const InvariantError = require('./exceptions/client/InvariantError');

const init = async () => {
  const usersService = new UsersService(savingService);
  const authenticationsService = new AuthenticationsService();

  const server = Hapi.server({
    host: config.server.host,
    port: config.server.port,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('moneybox_jwt', 'jwt', {
    keys: config.jwt.accessTokenKey,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.jwt.tokenAge,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: {
        usersService,
        savingService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        usersService,
        authenticationsService,
        tokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: savings,
      options: {
        service: savingService,
        validator: SavingsValidator,
      },
    },
    {
      plugin: _exports,
      options: {
        exportsService: ExportsService,
        savingService,
        validator: ExportsValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (req, res) => {
    const { response } = req;
    if (response instanceof Error) {
      console.log(response);
      if (response instanceof AuthenticationsError) {
        const authError = res.response({
          status: 'fail',
          message: response.message,
        });
        authError.code(response.statusCode);
        return authError;
      }

      if (response instanceof NotFoundError) {
        const notFoundError = res.response({
          status: 'fail',
          message: response.message,
        });
        notFoundError.code(response.statusCode);
        return notFoundError;
      }

      if (response instanceof InvariantError) {
        const invariantError = res.response({
          status: 'fail',
          message: response.message,
        });
        invariantError.code(response.statusCode);
        return invariantError;
      }

      if (response instanceof ClientError) {
        const clientError = res.response({
          status: 'fail',
          message: response.message,
        });
        clientError.code(response.statusCode);
        return clientError;
      }

      if (!response.isServer) {
        return res.continue;
      }

      const serverError = res.response({
        status: 'fail',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      serverError.code(500);
      return serverError;
    }

    return res.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
