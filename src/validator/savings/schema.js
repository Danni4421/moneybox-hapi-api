const Joi = require('joi');

const PostMoneyboxDetailsPayloadSchema = Joi.object({
  balance: Joi.number().min(0).required(),
  savingGoals: Joi.string(),
  target: Joi.string(),
});

const PutMoneyboxDetailsPayloadSchema = Joi.object({
  amount: Joi.number().min(1).required(),
});

module.exports = {
  PostMoneyboxDetailsPayloadSchema,
  PutMoneyboxDetailsPayloadSchema,
};
