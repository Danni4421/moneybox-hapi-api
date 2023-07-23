const SavingsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'savings',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const savingsHandler = new SavingsHandler(service, validator);
    server.route(routes(savingsHandler));
  },
};
