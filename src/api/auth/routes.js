const routes = (handler) => [
  {
    method: 'POST',
    path: '/auth',
    handler: handler.postAuthenticationsHandler,
  },
  {
    method: 'PUT',
    path: '/auth',
    handler: handler.putAuthenticationsHandler,
  },
  {
    method: 'DELETE',
    path: '/auth',
    handler: handler.deleteAuthenticationsHandler,
  },
];

module.exports = routes;
