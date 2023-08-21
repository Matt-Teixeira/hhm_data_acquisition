const db = require("../../utils/db/pg-pool");
const {
  get_redis_online_queue,
  clear_redis_online_queue,
} = require("../../redis");

async function insertHeartbeat() {
  const queue = await get_redis_online_queue();
  await clear_redis_online_queue();

  const dup_systems = [];
  const insert_array = [];

  const insert_str = `INSERT INTO alert.offline (system_id, capture_datetime, successful_acquisition) VALUES `;
  let values = [];
  const on_conflict = `ON CONFLICT (system_id) DO UPDATE SET `;
  const set_str = `capture_datetime = EXCLUDED.capture_datetime, successful_acquisition = EXCLUDED.successful_acquisition, inserted_at = EXCLUDED.inserted_at;`;

  for (const system of queue) {
    // Check for possible duplicates in queue and prevent double runs
    let is_duplicate = dup_systems.indexOf(system.id);
    if (is_duplicate !== -1) continue;

    insert_array.push({
      system_id: system.id,
      capture_datetime: system.capture_datetime,
      successful_acquisition: system.successful_acquisition,
    });
    dup_systems.push(system.id);

    values.push(
      `('${system.id}', '${system.capture_datetime}', ${system.successful_acquisition})`
    );
  }

  let values_str = "";

  console.log(values.length);
  for (let i = 0; i < values.length; i++) {
    console.log(i);
    if (i === values.length - 1) {
      values_str += values[i] + " ";
      continue;
    }
    values_str += values[i] + ", ";
  }

  let query_string = `${insert_str}${values_str}${on_conflict}${set_str}`;

  console.log(query_string);

  await db.any(query_string);
}

module.exports = { insertHeartbeat };

/* 
const query = pgp.helpers.insert(insert_array, pg_cs.alert.ip.offline) + ` ON CONFLICT (system_id) DO UPDATE SET capture_datetime = '${insert_array[0].capture_datetime}'`;
await db.any(query);



[
  {
    system_id: 'SME15813',
    capture_datetime: '2023-08-21T14:24:27.691-04:00',
    successful_acquisition: true
  },
  {
    system_id: 'SME10257',
    capture_datetime: '2023-08-21T14:25:46.099-04:00',
    successful_acquisition: false
  }
]
*/
