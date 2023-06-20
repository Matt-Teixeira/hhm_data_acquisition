const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getGeCtHhm } = require("../../../sql/qf-provider");

async function get_siemens_ct_data(run_id) {
  try {
    await log("info", run_id, "Siemens_CT", "get_siemens_ct_data", "FN CALL");
    const manufacturer = "Siemens";
    const modality = "CT";
    const systems = await getGeCtHhm([manufacturer, modality]);

    console.log("********** SYSTEMS **********");
    console.log(systems);

    const runable_systems = [];
    for (const system of systems) {
      // REMOVE THIS CONDITION. USED TO SKIP OVER SYSTEMS WITHOUT AN ACQUISITION CONFIG
      if (system.data_acquisition && system.ip_address) {
        const cv_path = `./read/sh/siemens/${system.data_acquisition.script}`;
        runable_systems.push(system);

        exec_hhm_data_grab(run_id, system.id, cv_path, manufacturer, modality, [system.ip_address]);
      }
    }
    console.log(systems.length);
    console.log(systems);
    console.log("*** RAN SYSTEMS ***");
    console.log(runable_systems.length);
    console.log(runable_systems);
  } catch (error) {
    console.log(error);
    await log("error", run_id, "Siemens_CT", "get_siemens_ct_data", "FN CALL", {
      error,
    });
  }
}

module.exports = get_siemens_ct_data;
