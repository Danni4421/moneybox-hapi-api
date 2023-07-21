const autoBind = require('auto-bind');

class SavingsHandler {
  constructor(
    moneyboxService,
    moneyboxDetailsService,
    savingGoalsService,
    validator
  ) {
    this._moneyboxService = moneyboxService;
    this._moneyboxDetailsService = moneyboxDetailsService;
    this._savingGoalsService = savingGoalsService;
    this._validator = validator;

    autoBind(this);
  }

  async postSavingHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'Berhasil membuat tabungan',
    });
    response.code(201);
    return response;
  }

  async getSavingDetailByIdHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan detail tabungan',
    });
    return response;
  }

  async putSavingByIdHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'Berhasil merubah data tabungan',
    });
    return response;
  }

  async deleteSavingByIdHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus tabungan',
    });
    return response;
  }
}

module.exports = SavingsHandler;
