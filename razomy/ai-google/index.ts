// Imports
import * as batch from './batch';
import * as cache from './cache';
import { CLIENT, MODELS } from './client';
import * as instant from './instant';
import * as refactor from './refactor';

// Named exports
export {
  CLIENT,
  MODELS,
  batch,
  cache,
  instant,
  refactor
};

// Default export
const aiGoogle = {
  batch,
  cache,
  CLIENT,
  MODELS,
  instant,
  refactor,
};

export default aiGoogle;
