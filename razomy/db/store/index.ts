// Imports
import { allocate } from './allocate';
import { createStore } from './create_store';
import { freeId } from './free_id';
import { registerColumn } from './register_column';
import type { Store } from './store';

// Named exports
export {
  allocate,
  createStore,
  freeId,
  registerColumn
};
export type {
  Store
};

// Default export
const store = {
  allocate,
  createStore,
  freeId,
  registerColumn,
};


export default store;
