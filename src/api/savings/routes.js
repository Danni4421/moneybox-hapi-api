const routes = (handler) => [
  {
    method: 'POST',
    path: '/save',
    handler: handler.postSavingHandler,
  },
  {
    method: 'GET',
    path: '/save/{mbId}',
    handler: handler.getSavingDetailByIdHandler,
  },
  {
    method: 'PUT',
    path: '/save/{mbId}',
    handler: handler.putSavingByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/save/{mbId}',
    handler: handler.deleteSavingByIdHandler,
  },
];

module.exports = routes;
