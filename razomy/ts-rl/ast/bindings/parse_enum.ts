import { EnumDeclaration as TsEnumDeclaration } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse as parseExpr } from "../expressions/parse";

export function parseEnum(node: TsEnumDeclaration): translators.EnumAst {
  return {
    kind: 'EnumAst', syntaxLayer: 3,
    identifier: { name: node.getName() },
    modifiers: [],
    parameters: [],
    properties: node.getMembers().map(m => ({
      kind: 'PropertyAst', syntaxLayer: 2, semanticLayer: 1,
      identifier: { name: m.getName() },
      value: m.getInitializer() ? parseExpr(m.getInitializer()!) : { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: m.getValue() }
    } as translators.PropertyAst))
  };
}
