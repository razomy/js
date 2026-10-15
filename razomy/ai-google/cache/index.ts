import { createSafe, type CreateCacheOptions } from './create_safe';
import { deleteSafe } from './delete_safe';

export { createSafe, deleteSafe, type CreateCacheOptions };

const cache = {
  createSafe,
  deleteSafe,
};

export default cache;