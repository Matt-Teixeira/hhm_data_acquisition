const { DateTime } = require("luxon");

const captureDatetime = () => {
  return DateTime.now().setZone("America/New_York").toISO();
};

module.exports = captureDatetime;
