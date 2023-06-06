const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getHhmCreds, getAllSystem } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../utils");

async function run_system_manual(systemArray, man_mod, cred_num) {
  const system = await getAllSystem(systemArray);
  const credentials = await getHhmCreds(man_mod);

  console.log(system[0].hhm_config.data_acquisition.script);
  console.log(credentials);

  const user = decryptString(credentials[cred_num].user_enc);
  const pass = decryptString(credentials[cred_num].password_enc);

  const path = `./read/sh/${man_mod[0]}/${system[0].hhm_config.data_acquisition.script}`;
  exec_hhm_data_grab("JOBID", "SME00001", path, [
    system[0].ip_address,
    user,
    pass,
    system[0].id,
  ]);
}

module.exports = run_system_manual;
/* 
Example hhm_config
{
  "file_path": "/opt/files/SME14520/hhm", 
  "modality": "CT", 
  "log_rotation": "v_2", "run_group": 1, 
  "data_acquisition": {"script": "ge_ct_data_grab.sh", "hhm_credentials_group": "1"}
}
 */
