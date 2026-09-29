// Imports
import { astToHirNode } from './ast_to_hir_node';
import { createPackageFunction } from './create_package_function';

// Named exports
export {
  astToHirNode,
  createPackageFunction
};

// Default export
const hir = {
  astToHirNode,
  createPackageFunction,
};

export default hir;
