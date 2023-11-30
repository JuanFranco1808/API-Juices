const FILE_NAME_LOG = "./db/access.txt";
const { readFile, writeFile } = require("../services/files");
const moment = require("moment-timezone");

function accessLog(method, path) {
  const LOG = readFile(FILE_NAME_LOG);
  const newDate =
    moment().tz("America/Bogota").format() +
    ` ${method}` +
    ` ${path}`;
  LOG.push(newDate);
  writeFile(FILE_NAME_LOG, LOG);
}

module.exports = { accessLog };
