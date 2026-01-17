import winston from 'winston';

export const isProduction = process.env.NODE_ENV === 'production';
export const consoleTransport = new winston.transports.Console({
  level: isProduction ? 'info' : 'debug',
// @ts-ignore
  prettyPrint: !isProduction,
  colorize: !isProduction,
  timestamp: !isProduction,
  label: 'rest-api',
});

// @ts-ignore
export const logger = new winston.createLogger({
  transports: [consoleTransport],
});



