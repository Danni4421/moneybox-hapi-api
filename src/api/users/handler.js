const autoBind = require('auto-bind');
const NotFoundError = require('../../exceptions/client/NotFoundError');

class UsersHandler {
  constructor(usersService, savingService, validator) {
    this._usersService = usersService;
    this._savingService = savingService;
    this._validator = validator;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    console.log(request.payload);
    this._validator.validateUserPayload(request.payload);
    const userId = await this._usersService.addUser(request.payload);

    const response = h.response({
      status: 'success',
      message: 'Berhasil membuat user baru',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }

  async getUserHandler(request, h) {
    const { id: userId } = request.params;
    const user = await this._usersService.getUser(userId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan User.',
      data: {
        user,
      },
    });
    response.code(201);
    return response;
  }

  async deleteUserHandler(request, h) {
    const { id: userId } = request.params;

    try {
      const moneybox =
        await this._savingService.mbService.deleteMoneyboxByUserId(userId);
      moneybox.map(async (mbdId) => {
        const { svgId } =
          await this._savingService.mbdService.getMoneyboxDetails(mbdId);
        await this._savingService.mbdService.deleteMoneyboxDetails(mbdId);
        await this._savingService.svgService.deleteSavingGoal(svgId);
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        await this._usersService.deleteUser(userId);
        const response = h.response({
          status: 'success',
          message: 'Berhasil menghapus user',
        });
        return response;
      }
    }
  }
}

module.exports = UsersHandler;
