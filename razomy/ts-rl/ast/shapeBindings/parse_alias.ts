import { TypeAliasDeclaration as TsTypeAliasDeclaration } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseAlias(node: TsTypeAliasDeclaration): abstracts.translators.AliasAst {
  return {
    kind: 'AliasAst',
    syntaxLayer: 3,
    identifier: { name: node.getName() },
    value: tsRl.ast.shapes.parse(node.getTypeNode()!) as abstracts.translators.StateAstType,
    modifiers: []
  };
}
