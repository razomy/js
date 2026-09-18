import { EnumDeclaration as TsEnumDeclaration } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseEnum(node: TsEnumDeclaration): abstracts.translators.EnumAst {
  return {
    kind: 'EnumAst', syntaxLayer: 3,
    identifier: { name: node.getName() },
    modifiers: [],
    parameters: [],
    properties: node.getMembers().map(m => ({
      kind: 'PropertyAst', syntaxLayer: 2, semanticLayer: 1,
      identifier: { name: m.getName() },
      value: m.getInitializer() ? tsRl.ast.expressions.parse(m.getInitializer()!) : { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: m.getValue() }
    } as abstracts.translators.PropertyAst))
  };
}
