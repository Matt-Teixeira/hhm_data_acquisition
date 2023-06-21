const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getGeCtHhm } = require("../../../sql/qf-provider");

async function get_siemens_mri_data(run_id) {
  try {
    const manufacturer = "Siemens";
    const modality = "MRI";
    const systems = await getGeCtHhm([manufacturer, modality]);

    for (const system of systems) {
      if (system.data_acquisition && system.ip_address) {
        const mri_path = `./read/sh/siemens/${system.data_acquisition.script}`;

        exec_hhm_data_grab(
          run_id,
          system.id,
          mri_path,
          manufacturer,
          modality,
          system,
          [system.ip_address]
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = get_siemens_mri_data;
