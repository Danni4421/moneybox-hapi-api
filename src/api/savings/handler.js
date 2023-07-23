const autoBind = require('auto-bind');

class SavingsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postSavingHandler(request, h) {
    this._validator.validatePostMoneyboxPayload(request.payload);

    const { balance, savingGoals, target } = request.payload;
    const { id: userId } = request.auth.credentials;

    const svgId = await this._service.svgService.addSavingGoal(
      savingGoals,
      target
    );

    const mbdId = await this._service.mbdService.addMoneyboxDetail(
      balance,
      svgId
    );

    const mbId = await this._service.mbService.addMoneybox(userId, mbdId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil membuat tabungan',
      data: {
        mbId,
      },
    });
    response.code(201);
    return response;
  }

  async getSavingDetailByIdHandler(request, h) {
    const { mbdId } = request.params;
    const moneybox = await this._service.mbdService.getMoneyboxDetail(mbdId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan detail tabungan',
      moneybox,
    });
    return response;
  }

  async putSavingByIdHandler(request, h) {
    this._validator.validatePutSavingPayload(request.payload);
    const { mbdId } = request.params;

    await this._service.mbdService.putSavingDetails(mbdId, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Berhasil memperbarui data tabungan',
    });
    return response;
  }

  async deleteSavingByIdHandler(request, h) {
    const { mbdId } = request.params;
    const { id: userId } = request.auth.credentials;
    const { svgId } = await this._service.mbdService.getMoneyboxDetail(mbdId);

    await this._service.mbService.deleteMoneybox(userId, mbdId);
    await this._service.mbdService.deleteMoneyboxDetails(mbdId);
    await await this._service.svgService.deleteSavingGoal(svgId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus tabungan',
    });
    return response;
  }
}

module.exports = SavingsHandler;
