const Joi = require('joi');

const PostMoneyboxDetailsPayloadSchema = Joi.object({
  balance: Joi.number().min(0).required(),
  savingGoals: Joi.string().optional(),
  target: Joi.string().optional(),
});

const PutMoneyboxDetailsPayloadSchema = Joi.object({
  amount: Joi.number().strict().min(1).required(),
});

module.exports = {
  PostMoneyboxDetailsPayloadSchema,
  PutMoneyboxDetailsPayloadSchema,
};
