const autoBind = require('auto-bind');

class AuthenticationsHandler {
  constructor(usersService, authenticationsService, tokenManager, validator) {
    this._usersService = usersService;
    this._authenticationsService = authenticationsService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    autoBind(this);
  }

  async postAuthenticationsHandler(request, h) {
    this._validator.validatePostAuthenticationsPayload(request.payload);
    const id = await this._usersService.verifyUserCredentials(request.payload);

    const accessToken = await this._tokenManager.generateAccessToken({ id });
    const refreshToken = await this._tokenManager.generateRefreshToken({ id });

    await this._authenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan access token.',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationsHandler(request, h) {
    this._validator.validatePutAuthenticationsPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);
    const { id } = await this._tokenManager.verifyRefreshToken(refreshToken);

    const newAccessToken = await this._tokenManager.generateAccessToken({ id });

    const response = h.response({
      status: 'success',
      message: 'Berhasil memperbarui refresh token.',
      data: {
        accessToken: newAccessToken,
      },
    });
    return response;
  }

  async deleteAuthenticationsHandler(request, h) {
    this._validator.validateDeleteAuthenticationsPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);
    await this._authenticationsService.deleteRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Berhasi menghapus access token.',
    });
    return response;
  }
}

module.exports = AuthenticationsHandler;
