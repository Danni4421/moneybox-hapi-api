const InvariantError = require('../../exceptions/client/InvariantError');
const ExportsPayloadSchema = require('./schema');

const ExportsValidator = {
  validateExportPayload: (payload) => {
    const validationResult = ExportsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportsValidator;
