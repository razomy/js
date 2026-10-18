import winston from 'winston';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const CONSOLE_TRANSPORT = new winston.transports.Console({
  level: IS_PRODUCTION ? 'info' : 'debug',
  // @ts-ignore
  prettyPrint: !IS_PRODUCTION,
  colorize: !IS_PRODUCTION,
  timestamp: !IS_PRODUCTION,
  label: 'rest-api',
});

// @ts-ignore
export const LOGGER = new winston.createLogger({
  transports: [CONSOLE_TRANSPORT],
});
