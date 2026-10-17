import { Identifier as TsIdentifier, Node } from "ts-morph";
import * as abstractions from "@razomy/abstractions";
import * as random from "@razomy/random";

export function parseReference(node: TsIdentifier | Node, ctx: abstractions.patterns.HasEnterLeave): abstractions.translators.ReferenceAsn {
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
