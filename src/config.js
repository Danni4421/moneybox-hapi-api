const config = {
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  rabbitmq_server: process.env.RABBITMQ_SERVER,
};

module.exports = config;
