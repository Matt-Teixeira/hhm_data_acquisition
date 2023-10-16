const db = require("../../utils/db/pg-pool");
const {
  get_redis_online_queue,
  clear_redis_online_queue
} = require("../../redis");

async function insertHeartbeat() {
  const queue = await get_redis_online_queue();

  await clear_redis_online_queue();
  await upsert_query_builder(queue);
}

const upsert_query_builder = async (queue) => {
  const dup_systems = [];

  const success_queue = [];
  const failed_queue = [];

  // Prevent inserts of hhm data 10/13/2023  && system.data_source !== "hhm"
  for (let system of queue) {
    if (system.successful_acquisition) {
      success_queue.push(system);
    }
    if (!system.successful_acquisition) {
      failed_queue.push(system);
    }
  }

  const insert_str = `INSERT INTO alert.offline (system_id, capture_datetime, successful_acquisition, source) VALUES `;
  let values = [];
  const on_conflict = `ON CONFLICT (system_id, source) DO UPDATE SET `;
  const set_str = `capture_datetime = EXCLUDED.capture_datetime, successful_acquisition = EXCLUDED.successful_acquisition, inserted_at = EXCLUDED.inserted_at, source = EXCLUDED.source;`;

  const failed_insert_str = `INSERT INTO alert.offline (system_id, successful_acquisition, source) VALUES `;
  let failed_values = [];
  const failed_on_conflict = `ON CONFLICT (system_id, source) DO UPDATE SET `;
  const failed_set_str = `successful_acquisition = EXCLUDED.successful_acquisition, inserted_at = EXCLUDED.inserted_at, source = EXCLUDED.source;`;

  // Insert Successful Acquisition Systems
  for (const system of success_queue) {
    // Check for possible duplicates in queue and prevent double runs
    //let is_duplicate = dup_systems.indexOf(system.id);
    //if (is_duplicate !== -1) continue;

    values.push(
      `('${system.id}', '${system.capture_datetime}', ${system.successful_acquisition}, '${system.data_source}')`
    );

    //dup_systems.push(system.id);
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

  // Insert FAILED Acquisition Systems
  for (const system of failed_queue) {
    // Check for possible duplicates in queue and prevent double runs
    //let is_duplicate = dup_systems.indexOf(system.id);
    //if (is_duplicate !== -1) continue;

    failed_values.push(
      `('${system.id}', ${system.successful_acquisition}, '${system.data_source}')`
    );

    //dup_systems.push(system.id);
  }

  let failed_values_str = "";

  for (let i = 0; i < failed_values.length; i++) {
    console.log(i);
    if (i === failed_values.length - 1) {
      failed_values_str += failed_values[i] + " ";
      continue;
    }
    failed_values_str += failed_values[i] + ", ";
  }

  let failed_query_string = `${failed_insert_str}${failed_values_str}${failed_on_conflict}${failed_set_str}`;

  await db.any(failed_query_string);
};

module.exports = { insertHeartbeat };
