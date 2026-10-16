// Imports
import { createSafe } from './create_safe';
import type { CreateCacheOptions } from './create_safe';
import { deleteSafe } from './delete_safe';

// Named exports
export {
  createSafe,
  deleteSafe
};
export type {
  CreateCacheOptions
};

// Default export
const cache = {
  createSafe,
  deleteSafe,
};


export default cache;
