import { EnumDeclaration as TsEnumDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseEnum(node: TsEnumDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.EnumAsn {
  const enumAsn: abstractions.translators.EnumAsn = {
    id: random.createUuid(),
    kind: 'EnumAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() },
    modifiers: [],
    parameters: [],
    properties: [],
  };

  if (!ctx.enter(enumAsn, node)) {
    return enumAsn;
  }

  enumAsn.properties = node.getMembers().map(m => {
    const prop: abstractions.translators.PropertyAsn = {
      id: random.createUuid(),
      kind: 'PropertyAsn',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      identifier: { name: m.getName() },
      shape: null,
      value: m.getInitializer()
        ? tsRl.ast.expressions.parse(m.getInitializer()!, ctx)
        : { id: random.createUuid(), kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: m.getValue() },
    };
    return prop;
  });

  return ctx.leave(enumAsn, node);
}