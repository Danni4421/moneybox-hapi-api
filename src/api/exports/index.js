const ExportsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { exportsService, savingService, validator }) => {
    const exportsHanlder = new ExportsHandler(
      exportsService,
      savingService,
      validator
    );
    server.route(routes(exportsHanlder));
  },
};
