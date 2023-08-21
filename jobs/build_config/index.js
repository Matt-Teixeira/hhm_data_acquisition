const { getOneSystem } = require("../../sql/qf-provider");

async function build_config(system) {
  const systems = await getOneSystem("SME15822");
  console.log(systems);
}

module.exports = build_config;
