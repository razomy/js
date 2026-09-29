// Imports
import { indexNodes } from './index_nodes';
import { joinDocs } from './join_docs';
import { linkHirTree } from './link_hir_tree';
import { SemanticContext } from './semantic_context';
import { ArrayNode, BindingNode, ClassNode, FunctionNode, LiteralNode, ModuleNode, SemanticNode, createSemanticNode } from './semantic_node';
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
  createSemanticNode,
  indexNodes,
  joinDocs,
  linkHirTree,
  walkHirChildren
};

// Default export
const st = {
  indexNodes,
  joinDocs,
  linkHirTree,
  SemanticContext,
  ArrayNode,
  BindingNode,
  ClassNode,
  FunctionNode,
  LiteralNode,
  ModuleNode,
  SemanticNode,
  createSemanticNode,
  walkHirChildren,
};

export default st;
