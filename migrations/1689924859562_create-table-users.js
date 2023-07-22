/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    firstName: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    lastName: {
      type: 'VARCHAR(50)',
    },
    password: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    email: {
      type: 'TEXT',
      notNull: true,
    },
    address: {
      type: 'TEXT',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
