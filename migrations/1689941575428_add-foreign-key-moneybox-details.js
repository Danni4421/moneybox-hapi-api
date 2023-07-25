/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint(
    'moneybox_details',
    'fk_moneybox_details.svg_id_saving_goals.id',
    'FOREIGN KEY (svg_id) REFERENCES saving_goals(id)'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint(
    'moneybox_details',
    'fk_moneybox_details.svg_id_saving_goals.id'
  );
};
