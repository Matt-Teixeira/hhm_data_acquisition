const db = require("../../utils/db/pg-pool");
const pgp = require("pg-promise")();
const { pg_column_sets: pg_cs } = require("../../utils/db/sql/pg-helpers_hhm");
const {
  get_redis_online_queue,
  clear_redis_online_queue,
} = require("../../redis");

async function insertOfflineTable() {
  const queue = await get_redis_online_queue();
  await clear_redis_online_queue();

  const dup_systems = [];
  const insert_array = [];

  for (const system of queue) {
    // Check for possible duplicates in queue and prevent double runs
    let is_duplicate = dup_systems.indexOf(system.id);
    if (is_duplicate !== -1) continue;

    insert_array.push({
      system_id: system.id,
      capture_datetime: system.capture_datetime,
    });
    dup_systems.push(system.id);
  }

  const query = pgp.helpers.insert(insert_array, pg_cs.alert.ip.offline);

  await db.any(query);
}

module.exports = { insertOfflineTable };
