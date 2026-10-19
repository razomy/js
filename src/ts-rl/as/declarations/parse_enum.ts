import { EnumDeclaration as TsEnumDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";
import type {ModifierAsnTypes} from "@razomy/abstractions/translator";

export function parseEnum(node: TsEnumDeclaration, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.EnumAsn {
  const enumAsn: abstractions.translator.EnumAsn = {
    id: random.createUuid(),
    kind: 'EnumAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() },
    modifiers: [
      node.isExported() ? { id: random.createUuid(), kind: 'AccessModifierAsn', syntaxRole: 'modifier', operator: 'public', value: null } : null,
    ].filter(Boolean) as ModifierAsnTypes[],
    parameters: [],
    properties: [],
  };

  if (!ctx.enter(enumAsn, node)) {
    return enumAsn;
  }

  enumAsn.properties = node.getMembers().map(m => {
    const prop: abstractions.translator.PropertyAsn = {
      id: random.createUuid(),
      kind: 'PropertyAsn',
      syntaxRole: 'expression',
      semanticLayer: 'state',
      identifier: { name: m.getName() },
      shape: null,
      value: m.getInitializer()
        ? tsRl.as.expressions.parse(m.getInitializer()!, ctx)
        : { id: random.createUuid(), kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: m.getValue() },
    };
    return prop;
  });

  return ctx.leave(enumAsn, node);
}
