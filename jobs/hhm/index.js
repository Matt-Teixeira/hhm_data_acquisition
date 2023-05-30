const get_ge_data = require("./ge");

const get_hhm_data = (modality) => {
    get_ge_data(modality);
    //get_siemens_data(modality);
}

module.exports = get_hhm_data;