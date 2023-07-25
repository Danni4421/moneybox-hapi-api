const routes = (handler) => [
  {
    method: 'POST',
    path: '/save',
    handler: handler.postSavingHandler,
    options: {
      auth: 'moneybox_jwt',
    },
  },
  {
    method: 'GET',
    path: '/save/{mbId}',
    handler: handler.getSavingDetailByIdHandler,
    options: {
      auth: 'moneybox_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/save/{mbId}',
    handler: handler.putSavingByIdHandler,
    options: {
      auth: 'moneybox_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/save/{mbId}',
    handler: handler.deleteSavingByIdHandler,
    options: {
      auth: 'moneybox_jwt',
    },
  },
];

module.exports = routes;
