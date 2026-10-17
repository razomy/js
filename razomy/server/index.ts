// Imports
import { echo } from './echo';
import type { HasServer } from './has_server';
import { CONSOLE_TRANSPORT, IS_PRODUCTION, LOGGER } from './logger';
import { shutdownFunction } from './shutdown_function';
import { staticHtml } from './static_html';

// Named exports
export {
  CONSOLE_TRANSPORT,
  IS_PRODUCTION,
  LOGGER,
  echo,
  shutdownFunction,
  staticHtml
};
export type {
  HasServer
};

// Default export
const server = {
  echo,
  CONSOLE_TRANSPORT,
  IS_PRODUCTION,
  LOGGER,
  shutdownFunction,
  staticHtml,
};


export default server;
