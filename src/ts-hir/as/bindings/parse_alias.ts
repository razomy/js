import { TypeAliasDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as random from "@razomy/random";
import * as tsHir from "@razomy/ts-hir";

export function parseAlias(node: TypeAliasDeclaration, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.AliasAsn {
  const aliasAsn: abstractions.translator.AliasAsn = {
    id: random.createUuid(),
    kind: 'AliasAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() },
    value: null as any,
  };

  if (!ctx.enter(aliasAsn, node)) {
    return aliasAsn;
  }

  aliasAsn.value = tsHir.as.shapes.parse(node.getTypeNode()!, ctx) as abstractions.translator.StateAsnType;

  return ctx.leave(aliasAsn, node);
}
