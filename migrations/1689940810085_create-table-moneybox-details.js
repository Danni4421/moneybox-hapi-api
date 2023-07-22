/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('moneybox_details', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    balance: {
      type: 'INTEGER',
      notNull: true,
    },
    svg_id: {
      type: 'VARCHAR(50)',
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {};
