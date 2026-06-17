// Imports
import { echo } from './echo';
import { CONSOLE_TRANSPORT, IS_PRODUCTION, LOGGER } from './logger';
import type { HasServer, HasUrl } from './server';
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
  HasServer,
  HasUrl
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
