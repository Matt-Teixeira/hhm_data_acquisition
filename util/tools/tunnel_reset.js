const db = require("../../utils/db/pg-pool");
const pgp = require("pg-promise")();
const { pg_column_sets: pg_cs } = require("../../utils/db/sql/pg-helpers_hhm");

function group_queue_keys(ip_queue) {
  const parsed_queue = {};
  // Set keys in parsed_queue
  for (let i = 0; i < 1; i++) {
    for (const key in ip_queue[0]) {
      parsed_queue[key] = [];
    }
  }
  // Loop through ip_queue array of system objects and push data to respective array
  for (const system of ip_queue) {
    // Loop through properties in object
    for (const key in system) {
      parsed_queue[key].push(system[key]); //system[system[key]]
    }
  }

  return parsed_queue;
}

function extract_ip(ip_queue) {
  const parsed_queue = {
    id: [],
    ip_addresses: [],
  };
  for (let entry of ip_queue) {
    parsed_queue.id.push(entry.id);
    parsed_queue.ip_addresses.push(entry.ip_address);
  }
  return parsed_queue;
}

module.exports = { group_queue_keys, extract_ip };
