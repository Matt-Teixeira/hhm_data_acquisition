const db = require("../../utils/db/pg-pool");
const {
  get_redis_online_queue,
  clear_redis_online_queue,
} = require("../../redis");

async function insertHeartbeat() {
  const queue = await get_redis_online_queue();
  await clear_redis_online_queue();
  await upsert_query_builder(queue);
}

const upsert_query_builder = async (queue) => {
  const dup_systems = [];

  const insert_str = `INSERT INTO alert.offline (system_id, capture_datetime, successful_acquisition) VALUES `;
  let values = [];
  const on_conflict = `ON CONFLICT (system_id) DO UPDATE SET `;
  const set_str = `capture_datetime = EXCLUDED.capture_datetime, successful_acquisition = EXCLUDED.successful_acquisition, inserted_at = EXCLUDED.inserted_at;`;

  for (const system of queue) {
    // Check for possible duplicates in queue and prevent double runs
    let is_duplicate = dup_systems.indexOf(system.id);
    if (is_duplicate !== -1) continue;

    values.push(
      `('${system.id}', '${system.capture_datetime}', ${system.successful_acquisition})`
    );

    dup_systems.push(system.id);
  }

  let values_str = "";

  for (let i = 0; i < values.length; i++) {
    console.log(i);
    if (i === values.length - 1) {
      values_str += values[i] + " ";
      continue;
    }
    values_str += values[i] + ", ";
  }

  let query_string = `${insert_str}${values_str}${on_conflict}${set_str}`;

  await db.any(query_string);
};

module.exports = { insertHeartbeat };