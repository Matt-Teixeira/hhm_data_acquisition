const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getHhmCreds, getAllSystem } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../utils");

async function run_system_manual(systemArray, man_mod, cred_num) {
  const system = await getAllSystem(systemArray);
  const credentials = await getHhmCreds(man_mod);
  console.log(system);
  console.log(credentials);

  const user = decryptString(credentials[cred_num].user_enc);
  const pass = decryptString(credentials[cred_num].password_enc);

  console.log(user);
  console.log(pass);

  const ct_path = "./read/sh/ge_ct_data_grab.sh";
  exec_hhm_data_grab("JOBID", "SME00001", ct_path, [system[0].ip_address, user, pass, system[0].id]);

 /*  for (const system of systems) {
    const ct_path = "./read/sh/ge_ct_data_grab.sh";
    console.log(system.id + "\n");

    const system_creds = credentials.find((credential) => {
      if (credential.id == system.credential_id) return true;
    });

    const user = decryptString(system_creds.user_enc);
    const pass = decryptString(system_creds.password_enc);

    //jobId, sme, execPath, args
    exec_hhm_data_grab("JOBID", "SME00001", ct_path, [system.ip_address, user, pass, system.id]);
  } */
}

module.exports = run_system_manual;