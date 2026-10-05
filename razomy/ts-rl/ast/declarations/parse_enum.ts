import { EnumDeclaration as TsEnumDeclaration } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseEnum(node: TsEnumDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.EnumAsn {
  return {
    kind: 'EnumAsn', syntaxRole: 'statement',
    identifier: { name: node.getName() },
    modifiers: [],
    parameters: [],
    properties: node.getMembers().map(m => ({
      kind: 'PropertyAsn', syntaxRole: 'expression', semanticLayer: 'state',
      identifier: { name: m.getName() },
      value: m.getInitializer() ? tsRl.ast.expressions.parse(m.getInitializer()!, ctx) : { kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: m.getValue() }
    } as abstracts.translators.PropertyAsn))
  };
}
