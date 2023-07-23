const ExportsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { exportsService, savingsService, validator }) => {
    const exportsHanlder = new ExportsHandler(
      exportsService,
      savingsService,
      validator
    );
    server.route(routes(exportsHanlder));
  },
};
