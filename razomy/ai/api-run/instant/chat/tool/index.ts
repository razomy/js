// Imports
import { mapMessage } from './map_message';
import { predict } from './predict';
import { predict_cache_string } from './predict_cache_string';

// Named exports
export {
  mapMessage,
  predict,
  predict_cache_string
};

// Default export
const tool = {
  mapMessage,
  predict,
  predict_cache_string,
};

export default tool;
