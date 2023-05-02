const { log } = require("../../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const execRsync = async (jobId, sme, rsyncShPath, rsyncShArgs) => {
//  console.log(rsyncShArgs);
  // THIS FUNCTION SYNCS A REMOTE FILE TO A LOCAL MIRROR AND RETURNS THE NEWLY SYNCED FILE SIZE
  await log("info", jobId, "execRsync", "FN CALL", {
    sme: sme,
    rsyncShPath: rsyncShPath,
    rsyncShArgs: rsyncShArgs,
  });

  try {
    const { stdout } = await execFile(rsyncShPath, rsyncShArgs);

    const fileSizeAfterRsync = parseInt(stdout);
    await log("info", jobId, "execRsync", "FN DETAILS", {
      fileSizeAfterRsync: fileSizeAfterRsync,
    });
    return fileSizeAfterRsync;
  } catch (error) {
    console.log(error);
    await log("error", jobId, "execRsync", "FN CATCH", {
      error: error,
    });
    return null;
  }
};

module.exports = execRsync;

/* 
[
  "SME10257",
  "v2_rdu_9600.log",
  "./files/SME10257.v2_rdu_9600.log",
  "25.63.233.139",
  "jdis",
];
 */