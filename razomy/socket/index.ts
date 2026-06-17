// Imports
import * as client from './client';
import * as server from './server';

// Named exports
export {
  client,
  server
};

// Default export
const socket = {
  client,
  server,
};

export default socket;
