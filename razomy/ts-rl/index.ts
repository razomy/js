// Imports
import * as ast from './ast';
import { createPackageFunction } from './create_package_function';
import { HirCtx, astToHir } from './ast_to_hir';

// Named exports
export {
  HirCtx,
  ast,
  astToHir,
  createPackageFunction
};

// Default export
const tsRl = {
  ast,
  createPackageFunction,
  SurfaceToTransformerHir: HirCtx,
};

export default tsRl;
