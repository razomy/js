// Imports
import { addEdge } from './add_edge';
import { astToHirNode } from './ast_to_hir_node';
import { createPackageFunction } from './create_package_function';
import { getEdge } from './get_edge';
import { getEdges } from './get_edges';
import type { HirCtx, Id, Layer } from './hir_ctx';
import { indexNodes } from './index_nodes';
import { joinDocs } from './join_docs';
import { linkHirTree } from './link_hir_tree';
import { removeEdge } from './remove_edge';
import { walkHirChildren } from './walk_hir_children';

// Named exports
export {
  addEdge,
  astToHirNode,
  createPackageFunction,
  getEdge,
  getEdges,
  indexNodes,
  joinDocs,
  linkHirTree,
  removeEdge,
  walkHirChildren
};
export type {
  HirCtx,
  Id,
  Layer
};

// Default export
const hir = {
  addEdge,
  astToHirNode,
  createPackageFunction,
  getEdge,
  getEdges,
  indexNodes,
  joinDocs,
  linkHirTree,
  removeEdge,
  walkHirChildren,
};


export default hir;
