/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('saving_goals', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    goal_name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    target: {
      type: 'TEXT',
      notNull: true,
    },
    status: {
      type: `VARCHAR(50)`,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('saving_goals');
};
