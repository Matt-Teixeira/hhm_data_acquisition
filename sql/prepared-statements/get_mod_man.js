const db = require("../../db/pgPool");

const getSystemModMan = async (argsArray) => {
  return await db.any(
    "SELECT id, manufacturer, modality FROM systems WHERE id = $1",
    argsArray
  );
};

module.exports = getSystemModMan