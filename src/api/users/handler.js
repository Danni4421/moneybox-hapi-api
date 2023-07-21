const autoBind = require('auto-bind');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'Berhasil membuat user baru',
    });
    response.code(201);
    return response;
  }

  async deleteUserHandler(request, h) {
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus user',
    });
    return response;
  }
}

module.exports = UsersHandler;
