import { TypeAliasDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseAlias(node: TypeAliasDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.AliasAsn {
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

  aliasAsn.value = tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) as abstractions.translators.StateAsnType;

  return ctx.leave(aliasAsn, node);
}