async function filter_schedules(runJob, machineConfigs, process_argv) {
  const configs = machineConfigs.filter(
    ({ schedule }) => schedule === process_argv
  );
  for (const config of configs) {
    const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
      config;
    runJob([sme, mmbScript, pgTable, regexModels, ip_address, user_id]);
  }
}

module.exports = { filter_schedules };
