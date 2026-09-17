// Imports
import { astToHirNode } from './ast_to_hir_node';
import { createPackageFunction } from './create_package_function';
import type { HirCtx, Id, Layer } from './hir_ctx';
import { indexNodes } from './index_nodes';
import { joinDocs } from './join_docs';
import { linkHirTree } from './link_hir_tree';
import { walkHirChildren } from './walk_hir_children';

// Named exports
export {
  astToHirNode,
  createPackageFunction,
  indexNodes,
  joinDocs,
  linkHirTree,
  walkHirChildren
};
export type {
  HirCtx,
  Id,
  Layer
};

// Default export
const hir = {
  astToHirNode,
  createPackageFunction,
  indexNodes,
  joinDocs,
  linkHirTree,
  walkHirChildren,
};


export default hir;
