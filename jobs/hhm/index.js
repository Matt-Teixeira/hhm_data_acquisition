const get_ge_data = require("./ge");
const get_philips_data = require("./philips");

const get_hhm_data = (run_id, manufacturer, modality) => {
  console.log(run_id, manufacturer, modality)
  switch (manufacturer) {
    case "GE":
      get_ge_data(run_id, modality);
      break;
    case "Philips":
      get_philips_data(run_id, modality);
      break;
    default:
      break;
  }
};

module.exports = get_hhm_data;
