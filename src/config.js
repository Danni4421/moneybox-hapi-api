const config = {
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  rabbitmq_server: process.env.RABBITMQ_SERVER,
  jwt: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    tokenAge: process.env.ACCESS_TOKEN_AGE,
  },
};

module.exports = config;
