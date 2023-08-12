import winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';
const consoleTransport = new winston.transports.Console({
  level: isProduction ? 'info' : 'debug',
  prettyPrint: !isProduction,
  colorize: !isProduction,
  timestamp: !isProduction,
  label: 'rest-api',
});

export const logger = new winston.createLogger({
  transports: [consoleTransport],
});



