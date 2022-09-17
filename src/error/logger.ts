import { createLogger, format, transports } from 'winston';
import { join } from 'path';
import { CONSTANTS } from '../config';

const errorLogPath = join('/logs');
const { ENV, ENVIRONMENTS, LOG_LEVELS } = CONSTANTS;

const logger = createLogger({
  level: LOG_LEVELS.DEBUG,
  format: format.json(),
  transports: [
    new transports.Console({
      format: format.simple(),
      level: LOG_LEVELS.INFO,
    }),
  ],
});

// Method to create a log entry. Depending on configuration it will log in file as well as console(stdout).
// level Log level such as DEBUG, INFO, etc
// message Message to log
//  info Extra information to log

const log = (level: string, message: string, info: any) => {
  logger.log(level, message, info);
};

export { log };
