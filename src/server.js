require('dotenv').config();
const Hapi = require('@hapi/hapi');
const config = require('./config');

const users = require('./api/users');
const UsersService = require('./service/db/users/UsersService');
const UsersValidator = require('./validator/users');

const savings = require('./api/savings');
const SavingService = require('./service/db/savings/SavingsService');
const SavingsValidator = require('./validator/savings');

const init = async () => {
  const usersService = new UsersService(SavingService);

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
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: savings,
      options: {
        service: SavingService,
        validator: SavingsValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (req, res) => {
    const { response } = req;
    if (response instanceof Error) {
      console.log(response.message);
    }

    if (!response.isServer) {
      return res.continue;
    }

    return res.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
