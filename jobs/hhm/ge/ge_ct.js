const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getGeCtHhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../utils");

async function get_ge_ct_data() {
  const systems = await getGeCtHhm(["GE", "CT"]);
  const credentials = await getHhmCreds(["GE", "CT"]);
  console.log(credentials);

  for (const system of systems) {
    const ct_path = "./read/sh/ge_ct_data_grab.sh";
    console.log(system.id + "\n");

    const system_creds = credentials.find((credential) => {
      if (credential.id == system.credential_id) return true;
    });

    const user = decryptString(system_creds.user_enc);
    const pass = decryptString(system_creds.password_enc);

    //jobId, sme, execPath, args
    exec_hhm_data_grab("JOBID", "SME00001", ct_path, [system.ip_address, user, pass, system.id]);
  }
}

module.exports = get_ge_ct_data;