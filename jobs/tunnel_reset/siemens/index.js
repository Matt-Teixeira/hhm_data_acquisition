const get_siemens_ct_data = require("./siemens_ct");
const get_siemens_cv_data = require("./siemens_cv");
const get_siemens_mri_data = require("./siemens_mri");

async function get_siemens_data(run_log, system) {
  try {
    switch (system.modality) {
      case "CT":
        get_siemens_ct_data(run_log, system);
        break;
      case "CV/IR":
        get_siemens_cv_data(run_log, system);
        break;
      case "MRI":
        get_siemens_mri_data(run_log, system);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = get_siemens_data;
