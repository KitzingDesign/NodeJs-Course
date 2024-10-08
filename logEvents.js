const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`; // Newline to separate log entries

  console.log(logItem);

  try {
    const logsDir = path.join(__dirname, "logs");

    // Check if the logs directory exists, and create it if not
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    // Append the log item to the eventLog.txt file
    await fsPromises.appendFile(path.join(logsDir, "eventLog.txt"), logItem);
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvents;
