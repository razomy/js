// Imports
import { createPackageFunction } from './create_package_function';
import type { HirCtx, Id, Layer } from './hir_ctx';
import { indexNodes } from './index_nodes';
import { joinDocs } from './join_docs';
import { linkHirTree } from './link_hir_tree';
import { ArrayNode, BindingNode, ClassNode, FunctionNode, LiteralNode, ModuleNode, SemanticContext, SemanticNode, createSemanticNode } from './semantic_context';
import { walkHirChildren } from './walk_hir_children';

// Named exports
export {
  ArrayNode,
  BindingNode,
  ClassNode,
  FunctionNode,
  LiteralNode,
  ModuleNode,
  SemanticContext,
  SemanticNode,
  createPackageFunction,
  createSemanticNode,
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
const sg = {
  createPackageFunction,
  indexNodes,
  joinDocs,
  linkHirTree,
  ArrayNode,
  BindingNode,
  ClassNode,
  FunctionNode,
  LiteralNode,
  ModuleNode,
  SemanticContext,
  SemanticNode,
  createSemanticNode,
  walkHirChildren,
};


export default sg;
