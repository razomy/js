// Imports
import { ConsoleLogger } from './console_logger';
import { NoneLogger } from './none_logger';
import type { Logger } from './none_logger';

// Named exports
export {
  ConsoleLogger,
  NoneLogger
};
export type {
  Logger
};

// Default export
const logging = {
  ConsoleLogger,
  NoneLogger,
};


export default logging;
