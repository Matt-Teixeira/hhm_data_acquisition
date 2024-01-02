const get_philips_cv_data = require("./philips_cv");
const get_philips_ct_data = require("./philips_ct");
const get_philips_mri_data = require("./philips_mri");

async function get_philips_data(job_id, run_log, system, capture_datetime, ip_reset) {
  try {
    switch (system.modality) {
      case "CT":
        await get_philips_ct_data(job_id, run_log, system, capture_datetime, ip_reset);
        break;
      case "CV/IR":
        await get_philips_cv_data(job_id, run_log, system, capture_datetime, ip_reset);
        break;
      case "MRI":
        await get_philips_mri_data(job_id, run_log, system, capture_datetime, ip_reset);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = get_philips_data;
