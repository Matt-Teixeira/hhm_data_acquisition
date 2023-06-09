const { log } = require("../../../logger");
const get_siemens_ct_data = require("./siemens_ct")

async function get_siemens_data(run_id, modality) {
  log("info", "NA", "NA", "get_ge_data", `FN CALL`, {
    modality,
  });

  try {
    switch (modality) {
      case "CT":
        get_siemens_ct_data(run_id);
        break;
      case "CV":
        //get_siemens_cv_data(run_id);
        break;
      case "MRI":
        //get_siemens_mri_data(run_id);
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
