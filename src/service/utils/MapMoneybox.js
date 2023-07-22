const mapMoneyboxToModels = ({ id, user_id, mb_details_id }) => ({
  id,
  userId: user_id,
  mbdId: mb_details_id,
});

module.exports = mapMoneyboxToModels;
