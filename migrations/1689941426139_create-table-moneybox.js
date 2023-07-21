/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('moneybox', {
    id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    mb_details_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {};
