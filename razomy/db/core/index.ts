// Imports
import { addNodeCore } from './add_node_core';
import { commitCore } from './commit_core';
import type { CoreDB, CustomOpHandler } from './core';
import { createCoreDb } from './create_core_db';
import { registerField } from './register_field';
import { setFieldCore } from './set_field_core';

// Named exports
export {
  addNodeCore,
  commitCore,
  createCoreDb,
  registerField,
  setFieldCore
};
export type {
  CoreDB,
  CustomOpHandler
};

// Default export
const core = {
  addNodeCore,
  commitCore,
  createCoreDb,
  registerField,
  setFieldCore,
};


export default core;
