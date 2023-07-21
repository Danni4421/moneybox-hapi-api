const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handler.deleteUserHandler,
  },
];

module.exports = routes;
