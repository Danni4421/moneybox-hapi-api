const autoBind = require('auto-bind');

class ExportsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postExportsHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'Berhasil melakukan export data tabungan',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
