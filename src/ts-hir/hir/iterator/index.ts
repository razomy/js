// Imports
import { computeSemanticLayers } from './compute_semantic_layers';
import { findExported } from './find_exported';
import { findHirNodes } from './find_hir_nodes';
import type { HirnFilter } from './find_hir_nodes';
import { indexNodes } from './index_nodes';
import { inlineReferences } from './inline_references';
import { joinDocs } from './join_docs';
import { linkHirTree } from './link_hir_tree';
import { removePrivateDeclarations } from './remove_private_declarations';
import { removeUnusedDeclarations } from './remove_unused_declarations';
import { resolveReferences } from './resolve_references';
import { walkHirChildren } from './walk_hir_children';

// Named exports
export {
  computeSemanticLayers,
  findExported,
  findHirNodes,
  indexNodes,
  inlineReferences,
  joinDocs,
  linkHirTree,
  removePrivateDeclarations,
  removeUnusedDeclarations,
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
  inlineReferences,
  joinDocs,
  linkHirTree,
  removePrivateDeclarations,
  removeUnusedDeclarations,
  resolveReferences,
  walkHirChildren,
};


export default iterator;
