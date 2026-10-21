// Imports
import { astToHirNode } from './ast_to_hir_node';
import { createPackageFunction } from './create_package_function';
import { hirToJsonString } from './hir_to_json_string';
import type { HirSerializeOptions } from './hir_to_json_string';
import * as iterator from './iterator';
import { SemanticContext } from './semantic_context';
import { semanticContextFromTsPackageFolder } from './semantic_context_from_ts_package_folder';
import { BindingSn, BlockSn, BranchSn, FunctionSn, GoSn, IdentityNode, LiteralSn, LoopSn, MatchSn, ModuleSn, OperatorSn, ReferenceSn, SemanticNode, StructSn } from './semantic_node';
import type { SnType } from './semantic_node';

// Named exports
export {
  BindingSn,
  BlockSn,
  BranchSn,
  FunctionSn,
  GoSn,
  IdentityNode,
  LiteralSn,
  LoopSn,
  MatchSn,
  ModuleSn,
  OperatorSn,
  ReferenceSn,
  SemanticContext,
  SemanticNode,
  StructSn,
  astToHirNode,
  createPackageFunction,
  hirToJsonString,
  iterator,
  semanticContextFromTsPackageFolder
};
export type {
  HirSerializeOptions,
  SnType
};

// Default export
const hir = {
  astToHirNode,
  createPackageFunction,
  hirToJsonString,
  iterator,
  SemanticContext,
  semanticContextFromTsPackageFolder,
  BindingSn,
  BlockSn,
  BranchSn,
  FunctionSn,
  GoSn,
  IdentityNode,
  LiteralSn,
  LoopSn,
  MatchSn,
  ModuleSn,
  OperatorSn,
  ReferenceSn,
  SemanticNode,
  StructSn,
};


export default hir;
