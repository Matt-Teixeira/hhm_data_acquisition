const { log } = require("../../../logger");
const get_philips_cv_data = require("./philips_cv");
const get_philips_ct_data = require("./philips_ct");
const get_philips_mri_data = require("./philips_mri");

module.exports = {get_philips_cv_data, get_philips_ct_data, get_philips_mri_data}