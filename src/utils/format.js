// External Dependencies
import chalk from "chalk";

/**
 * Formats the Cassandra Logs
 * @param {string} level -- The Log level
 * @param {string} loggerName -- The name of the Cassandra logger generating the message
 * @param {string} message -- The log message
 */
export const formatLog = (level, loggerName, message) => {
  // Define the common log formatter
  const common = type => {
    console.log(type, "-", chalk.grey(`${loggerName}:`), message);
  };

  // Format the log based on the level
  switch (level) {
    case "error":
      common(chalk.red(level));
      break;
    case "info":
      common(chalk.green(level));
      break;
    case "verbose":
      if (process.env.DEBUG) {
        common(chalk.yellow(level));
      }

      break;
    default:
      console.log(`${level} - ${loggerName}:  ${message}`);
      break;
  }
};
