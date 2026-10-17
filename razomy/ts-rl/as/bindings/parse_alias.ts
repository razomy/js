import { TypeAliasDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseAlias(node: TypeAliasDeclaration, ctx: abstractions.patterns.HasEnterLeave): abstractions.translators.AliasAsn {
  const aliasAsn: abstractions.translators.AliasAsn = {
    id: random.createUuid(),
    kind: 'AliasAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() },
    value: null as any,
  };

  if (!ctx.enter(aliasAsn, node)) {
    return aliasAsn;
  }

  aliasAsn.value = tsRl.as.shapes.parse(node.getTypeNode()!, ctx) as abstractions.translators.StateAsnType;

  return ctx.leave(aliasAsn, node);
}
