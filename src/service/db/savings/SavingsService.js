const MoneyboxService = require('./MoneyboxService');
const MoneyboxDetailsService = require('./MoneyboxDetailsService');
const SavingGoalsService = require('./SavingGoalsService');

const savingGoalsService = new SavingGoalsService();
const moneyboxDetailsService = new MoneyboxDetailsService();
const moneyboxService = new MoneyboxService();

const savingsService = {
  mbService: moneyboxService,
  mbdService: moneyboxDetailsService,
  svgService: savingGoalsService,
};

module.exports = savingsService;
