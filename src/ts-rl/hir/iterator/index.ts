// Imports
import { computeSemanticLayers } from './compute_semantic_layers';
import { findExported } from './find_exported';
import { findHirNodes } from './find_hir_nodes';
import type { HirnFilter } from './find_hir_nodes';
import { indexNodes } from './index_nodes';
import { joinDocs } from './join_docs';
import { linkHirTree } from './link_hir_tree';
import { resolveReferences } from './resolve_references';
import { walkHirChildren } from './walk_hir_children';

// Named exports
export {
  computeSemanticLayers,
  findExported,
  findHirNodes,
  indexNodes,
  joinDocs,
  linkHirTree,
  resolveReferences,
  walkHirChildren
};
export type {
  HirnFilter
};

// Default export
const iterator = {
  computeSemanticLayers,
  findExported,
  findHirNodes,
  indexNodes,
  joinDocs,
  linkHirTree,
  resolveReferences,
  walkHirChildren,
};


export default iterator;
