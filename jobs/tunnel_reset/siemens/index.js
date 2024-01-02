const get_siemens_ct_data = require("./siemens_ct");
const get_siemens_cv_data = require("./siemens_cv");
const get_siemens_mri_data = require("./siemens_mri");

async function get_siemens_data(job_id, run_log, system, capture_datetime, ip_reset) {
  try {
    switch (system.modality) {
      case "CT":
        await get_siemens_ct_data(job_id, run_log, system, capture_datetime, ip_reset);
        break;
      case "CV/IR":
        await get_siemens_cv_data(job_id, run_log, system, capture_datetime, ip_reset);
        break;
      case "MRI":
        await get_siemens_mri_data(job_id, run_log, system, capture_datetime, ip_reset);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = get_siemens_data;
