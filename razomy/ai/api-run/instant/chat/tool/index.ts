// Imports
import { mapMessage } from './map_message';
import { predict } from './predict';
import { predictCacheString } from './predict_cache_string';

// Named exports
export {
  mapMessage,
  predict,
  predictCacheString
};

// Default export
const tool = {
  mapMessage,
  predict,
  predictCacheString,
};

export default tool;
