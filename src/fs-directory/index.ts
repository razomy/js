// Imports
import { getSync } from './get_sync';
import { isDirEmpty } from './is_dir_empty';
import { observe } from './observe';
import { orderByCreateDate } from './order_by_create_date';
import { tryCreate } from './try_create';

// Named exports
export {
  getSync,
  isDirEmpty,
  observe,
  orderByCreateDate,
  tryCreate
};

// Default export
const fsDirectory = {
  getSync,
  isDirEmpty,
  observe,
  orderByCreateDate,
  tryCreate,
};

export default fsDirectory;
