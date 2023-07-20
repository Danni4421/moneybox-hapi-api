import * as Hapi from '@hapi/hapi';

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000,
  });
};
