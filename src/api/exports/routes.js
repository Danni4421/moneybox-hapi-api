const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/save/{mbId}',
    handler: handler.postExportsHandler,
  },
];

module.exports = routes;
