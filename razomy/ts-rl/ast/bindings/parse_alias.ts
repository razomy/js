import { TypeAliasDeclaration } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseAlias(node: TypeAliasDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.AliasAst {
  return {
    kind: 'AliasAst',
    syntaxRole: 'statement',
    identifier: { name: node.getName() },
    value: tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) as abstracts.translators.StateAstType,
  };
}
