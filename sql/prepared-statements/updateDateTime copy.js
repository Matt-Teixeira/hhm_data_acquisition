const db = require("../../db/pgPool");

const updateDateTime = async (argsArray) => {
  await db.none(
    "UPDATE $1:raw SET host_datetime = $2, status = 'PROCESSING COMPLETE' WHERE system_id = $3 AND host_date = $4 AND host_time = $5",
    argsArray
  );
};

module.exports = updateDateTime
