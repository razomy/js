// Imports
import * as ast from './ast';
import { createPackageFunction } from './create_package_function';
import { HirCtx, astToHir } from './hir_ctx';
import { modifiersAstToHir } from './modifiers_ast_to_hir';

// Named exports
export {
  HirCtx,
  ast,
  astToHir,
  createPackageFunction,
  modifiersAstToHir
};

// Default export
const tsRl = {
  ast,
  createPackageFunction,
  HirCtx,
  astToHir,
  modifiersAstToHir,
};

export default tsRl;
