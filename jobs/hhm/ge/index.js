const { log } = require("../../../logger");
const get_ge_ct_data = require("./ge_ct");
const get_ge_mri_data = require("./ge_mri");
const get_ge_cv_data = require("./ge_cv");

async function get_ge_data(run_id, modality, capture_datetime) {
  log("info", "NA", "NA", "get_ge_data", `FN CALL`, {
    modality,
  });

  try {
    switch (modality) {
      case "CT":
        await get_ge_ct_data(run_id, capture_datetime);
        break;
      case "CV":
        await get_ge_cv_data(run_id, capture_datetime);
        break;
      case "MRI":
        await get_ge_mri_data(run_id, capture_datetime);
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

module.exports = get_ge_data;
