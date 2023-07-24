const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().optional(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
});

module.exports = UserPayloadSchema;
