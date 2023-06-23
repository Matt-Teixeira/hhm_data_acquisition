const get_ge_data = require("./ge");
const get_philips_data = require("./philips");
const get_siemens_data = require("./siemens");

const get_hhm_data = (run_log, manufacturer, modality) => {
  console.log(run_log, manufacturer, modality);
  switch (manufacturer) {
    case "GE":
      get_ge_data(run_log, modality);
      break;
    case "Philips":
      get_philips_data(run_log, modality);
      break;
    case "Siemens":
      get_siemens_data(run_log, modality);
      break;
    default:
      break;
  }
};

module.exports = get_hhm_data;
