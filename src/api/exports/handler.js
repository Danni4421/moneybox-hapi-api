const autoBind = require('auto-bind');

class ExportsHandler {
  constructor(exportsService, savingService, validator) {
    this._exportsService = exportsService;
    this._savingService = savingService;
    this._validator = validator;

    autoBind(this);
  }

  async postExportsHandler(request, h) {
    this._validator.validateExportPayload(request.payload);

    const { id: userId } = request.auth.credentials;
    const { mbId } = request.params;

    console.log({ userId, mbId });
    await this._savingService.mbService.verifyMoneybox(userId, mbId);
    console.log('success');

    await this._exportsService.sendMessage(
      'export:tabungan',
      JSON.stringify(mbId)
    );

    const response = h.response({
      status: 'success',
      message: 'Berhasil melakukan export data tabungan',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
