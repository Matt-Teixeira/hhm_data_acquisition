const db = require("../../db/pgPool");

async function get_ip_sec_table() {
  let ip_sec_data = await db.any("SELECT * FROM util.ip_sec;");
  let data_acqu_data = await db.any(
    "SELECT system_id, mmb_ip, host_ip FROM config.acquisition;"
  );

  //console.log(ip_sec_data);
  for (let ip of ip_sec_data) {
    for (let system of data_acqu_data) {
      if (
        system.host_ip === ip.remote_subnet_ip ||
        system.mmb_ip === ip.remote_subnet_ip
      ) {

        let query_str =
          "UPDATE config.acquisition SET vpn = TRUE WHERE system_id = $1;";
        let value = [system.system_id];

        db.any(query_str, value);
      }
    }
  }
}

module.exports = get_ip_sec_table;

// { system_id: 'SME15819', mmb_ip: '172.31.3.39', host_ip: null }

/* 
{
    remote_subnet_ip: '129.109.254.196',
    remote_subnet_mask: 32,
    endpoint_id: 36,
    tunnel_id: 521
  },
*/
