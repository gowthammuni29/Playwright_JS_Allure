import winston from 'winston';
import fs from 'fs';

const logDir = 'logs';

// create logs folder if not exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info',

  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()} : ${message}`
    )
  ),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${logDir}/automation.log`
    })
  ],
});

export default logger;