const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { usersService, savingService, validator }) => {
    const usersHandler = new UsersHandler(
      usersService,
      savingService,
      validator
    );
    server.route(routes(usersHandler));
  },
};
