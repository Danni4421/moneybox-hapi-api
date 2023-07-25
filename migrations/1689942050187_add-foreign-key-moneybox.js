/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint(
    'moneybox',
    'fk_moneybox.user_id_users.id',
    'FOREIGN KEY (user_id) REFERENCES users(id)'
  );

  pgm.addConstraint(
    'moneybox',
    'fk_moneybox.mb_details.id_moneybox_detais.id',
    'FOREIGN KEY (mb_details_id) REFERENCES moneybox_details(id)'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('moneybox', 'fk_moneybox.user_id_users.id');
  pgm.dropConstraint(
    'moneybox',
    'fk_moneybox.mb_details.id_moneybox_detais.id'
  );
};
