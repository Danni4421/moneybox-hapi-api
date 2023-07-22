const mapMoneyboxDetailsToModels = ({
  id,
  balance,
  svg_id,
  created_at,
  updated_at,
}) => ({
  id,
  balance,
  svgId: svg_id,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = mapMoneyboxDetailsToModels;
