const { log } = require("../../../logger");
const get_ge_ct_data = require("./ge_ct");
const get_ge_mri_data = require("./ge_mri");
const get_ge_cv_data = require("./ge_cv");

async function get_ge_data(run_id, modality) {
  log("info", "NA", "NA", "get_ge_data", `FN CALL`, {
    modality,
  });

  try {
    switch (modality) {
      case "CT":
        get_ge_ct_data(run_id);
        break;
      case "CV":
        get_ge_cv_data(run_id);
        break;
      case "MRI":
        get_ge_mri_data(run_id);
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
