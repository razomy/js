import { TypeAliasDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseAlias(node: TypeAliasDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.AliasAsn {
  return {
    kind: 'AliasAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() },
    value: tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) as abstractions.translators.StateAsnType,
  };
}
