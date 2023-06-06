const { log } = require("../../../logger");
const get_philips_cv_data = require("./philips_cv");
const get_philips_ct_data = require("./philips_ct");
const get_philips_mri_data = require("./philips_mri");

async function get_philips_data(run_id, modality) {
  log("info", "NA", "NA", "get_ge_data", `FN CALL`, {
    modality,
  });

  try {
    switch (modality) {
      case "CT":
        get_philips_ct_data(run_id);
        break;
      case "CV":
        get_philips_cv_data(run_id);
        break;
      case "MRI":
        get_philips_mri_data(run_id);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    log("error", "NA", "NA", "get_ge_data", `FN CALL`, {
      error,
      modality,
    });
  }
}

module.exports = get_philips_data;
