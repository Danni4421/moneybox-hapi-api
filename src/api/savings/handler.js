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

    await this._service.mbService.addMoneybox(userId, mbdId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil membuat tabungan',
      data: {
        mbdId,
      },
    });
    response.code(201);
    return response;
  }

  async getSavingDetailByIdHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { mbId } = request.params;

    await this._service.mbService.verifyMoneybox(userId, mbId);
    const moneybox = await this._service.mbdService.getMoneyboxDetailsById(
      mbId
    );

    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan detail tabungan',
      data: {
        id: moneybox.id,
        balance: moneybox.balance,
      },
    });
    return response;
  }

  async putSavingByIdHandler(request, h) {
    this._validator.validatePutMoneyboxPayload(request.payload);
    const { id: userId } = request.auth.credentials;
    const { mbId } = request.params;

    await this._service.mbService.verifyMoneybox(userId, mbId);
    await this._service.mbdService.putMoneyboxDetails(mbId, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Berhasil memperbarui data tabungan',
      data: {
        saving: `Berhasil menabung sebesar ${request.payload.amount}`,
      },
    });
    return response;
  }

  async deleteSavingByIdHandler(request, h) {
    const { mbId } = request.params;
    const { id: userId } = request.auth.credentials;
    const { svgId } = await this._service.mbdService.getMoneyboxDetailsById(
      mbId
    );

    await this._service.mbService.deleteMoneybox(userId, mbId);
    await this._service.mbdService.deleteMoneyboxDetails(mbId);
    await this._service.svgService.deleteSavingGoal(svgId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus tabungan',
    });
    return response;
  }
}

module.exports = SavingsHandler;
