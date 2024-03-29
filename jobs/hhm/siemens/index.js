const { log } = require("../../../logger");
const get_siemens_ct_data = require("./siemens_ct");
const get_siemens_cv_data = require("./siemens_cv");
const get_siemens_mri_data = require("./siemens_mri");

async function get_siemens_data(run_id, modality, capture_datetime) {
  log("info", "NA", "NA", "get_ge_data", `FN CALL`, {
    modality,
  });

  try {
    switch (modality) {
      case "CT":
        await get_siemens_ct_data(run_id, capture_datetime);
        break;
      case "CV":
        await get_siemens_cv_data(run_id, capture_datetime);
        break;
      case "MRI":
        await get_siemens_mri_data(run_id, capture_datetime);
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

module.exports = get_siemens_data;
