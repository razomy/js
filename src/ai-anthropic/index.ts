// Imports
import * as batch from './batch';
import { CLIENT, MAX_TOKENS, MODELS } from './client';
import * as instant from './instant';

// Named exports
export {
  CLIENT,
  MAX_TOKENS,
  MODELS,
  batch,
  instant
};

// Default export
const aiAnthropic = {
  batch,
  CLIENT,
  MAX_TOKENS,
  MODELS,
  instant,
};

export default aiAnthropic;
