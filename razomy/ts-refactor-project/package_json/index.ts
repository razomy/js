// Imports
import { addDependencies } from './add_dependencies';
import { autoPatch } from './auto_patch';
import { createAtChildDirs } from './create_at_child_dirs';
import { createDist } from './create_dist';
import { createRoot } from './create_root';
import { getAll } from './get_all';
import { updateByTemplate } from './update_by_template';

// Named exports
export {
  addDependencies,
  autoPatch,
  createAtChildDirs,
  createDist,
  createRoot,
  getAll,
  updateByTemplate
};

// Default export
const packageJson = {
  addDependencies,
  autoPatch,
  createAtChildDirs,
  createDist,
  createRoot,
  getAll,
  updateByTemplate,
};

export default packageJson;
