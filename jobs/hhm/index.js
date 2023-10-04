const get_ge_data = require("./ge");
const get_philips_data = require("./philips");
const get_siemens_data = require("./siemens");

const get_hhm_data = async (run_log, manufacturer, modality, capture_datetime) => {

  switch (manufacturer) {
    case "GE":
      await get_ge_data(run_log, modality, capture_datetime);
      break;
    case "Philips":
      await get_philips_data(run_log, modality, capture_datetime);
      break;
    case "Siemens":
      await get_siemens_data(run_log, modality, capture_datetime);
      break;
    default:
      break;
  }
};

module.exports = get_hhm_data;
