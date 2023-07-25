const Joi = require('joi');

const ExportsPayloadSchema = Joi.object({
  targetEmail: Joi.string().email().required(),
});

module.exports = ExportsPayloadSchema;
