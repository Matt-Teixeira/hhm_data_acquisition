const get_ge_ct_data = require("./ge_ct");
const get_ge_mri_data = require("./ge_mri");
const get_ge_cv_data = require("./ge_cv");

async function get_ge_data(run_log, system) {
  try {
    switch (system.modality) {
      case "CT":
        console.log("RUNNING GE MODALITY");
        await get_ge_ct_data(run_log, system);
        break;
      case "CV/IR":
        await get_ge_cv_data(run_log, system);
        break;
      case "MRI":
        await get_ge_mri_data(run_log, system);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = get_ge_data;
