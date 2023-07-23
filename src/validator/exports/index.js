const ExportsPayloadSchema = require('./schema');

const ExportsValidator = {
  validateExportPayload: (payload) => {
    const validationResult = ExportsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = ExportsValidator;
