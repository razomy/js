const winston = require('winston');

const consoleTransport = new winston.transports.Console({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  prettyPrint: process.env.NODE_ENV !== 'production',
  colorize: process.env.NODE_ENV !== 'production',
  timestamp: process.env.NODE_ENV !== 'production',
  label: 'rest-api',
});

const logger = new winston.createLogger({
  transports: [consoleTransport],
});

module.exports = logger;

