const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/save/{mbId}',
    handler: handler.postExportsHandler,
    options: {
      auth: 'moneybox_jwt',
    },
  },
];

module.exports = routes;
