const SavingsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'savings',
  version: '1.0.0',
  register: async (
    server,
    { moneyboxService, moneyboxDetailsService, savingGoalsService, validator }
  ) => {
    const savingsHandler = new SavingsHandler(
      moneyboxService,
      moneyboxDetailsService,
      savingGoalsService,
      validator
    );
    server.route(routes(savingsHandler));
  },
};
