import { Identifier as TsIdentifier, Node } from "ts-morph";
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseReference(node: TsIdentifier | Node, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ReferenceAsn {
  const refAsn: abstractions.translators.ReferenceAsn = {
    id: random.createUuid(),
    kind: 'ReferenceAsn',
    syntaxRole: 'expression',
    identifier: { name: node.getText() },
  };

  if (!ctx.enter(refAsn, node)) {
    return refAsn;
  }

  return ctx.leave(refAsn, node);
}