const InvariantError = require('../../exceptions/client/InvariantError');
const {
  PostMoneyboxDetailsPayloadSchema,
  PutMoneyboxDetailsPayloadSchema,
} = require('./schema');

const SavingsValidator = {
  validatePostMoneyboxPayload: (payload) => {
    const validationResult = PostMoneyboxDetailsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutMoneyboxPayload: (payload) => {
    const validationResult = PutMoneyboxDetailsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SavingsValidator;
