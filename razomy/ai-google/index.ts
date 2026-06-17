// Imports
import * as batch from './batch';
import { CLIENT, MODELS } from './client';
import * as instant from './instant';

// Named exports
export {
  CLIENT,
  MODELS,
  batch,
  instant
};

// Default export
const aiGoogle = {
  batch,
  CLIENT,
  MODELS,
  instant,
};

export default aiGoogle;
