require('dotenv').config();
const Hapi = require('@hapi/hapi');
const config = require('./config');

const users = require('./api/users');
const UsersService = require('./service/db/users/UsersService');
const UsersValidator = require('./validator/users');

const savings = require('./api/savings');
const MoneyboxService = require('./service/db/savings/MoneyboxService');
const MoneyboxDetailsService = require('./service/db/savings/MoneyboxDetailsService');
const SavingGoalsService = require('./service/db/savings/SavingGoalsService');
const SavingsValidator = require('./validator/savings');

const init = async () => {
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
        service: new UsersService(),
        validator: UsersValidator,
      },
    },
    {
      plugin: savings,
      options: {
        moneyboxService: new MoneyboxService(),
        moneyboxDetailsService: new MoneyboxDetailsService(),
        savingGoalsService: new SavingGoalsService(),
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
