const amqp = require('amqplib');
const config = require('../../config');

const ExportsService = {
  sendMessage: async (queue, message) => {
    const connection = await amqp.connect(config.rabbitmq_server);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, {
      durable: true,
    });

    await channel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

module.exports = ExportsService;
