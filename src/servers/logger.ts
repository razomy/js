import winston from 'winston';

export const is_production = process.env.NODE_ENV === 'production';
export const console_transport = new winston.transports.Console({
  level: is_production ? 'info' : 'debug',
// @ts-ignore
  prettyPrint: !is_production,
  colorize: !is_production,
  timestamp: !is_production,
  label: 'rest-api',
});

// @ts-ignore
export const logger = new winston.createLogger({
  transports: [console_transport],
});



