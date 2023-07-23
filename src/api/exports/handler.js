const autoBind = require('auto-bind');

class ExportsHandler {
  constructor(exportsService, moneyboxDetailsService, validator) {
    this._exportsService = exportsService;
    this._moneyboxDetailsService = moneyboxDetailsService;
    this._validator = validator;

    autoBind(this);
  }

  async postExportsHandler(request, h) {
    this._validator.validateExportPayload(request.payload);

    const { mbdId } = request.params;
    const moneybox = await this._moneyboxDetailsService.getMoneyboxDetails(
      mbdId
    );

    await this._exportsService.sendMessage(
      'export:tabungan',
      JSON.stringify(moneybox)
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
