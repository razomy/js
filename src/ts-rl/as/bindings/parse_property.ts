import { PropertyDeclaration } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseProperty(node: PropertyDeclaration, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.PropertyAsn {
  const propAsn: abstractions.translator.PropertyAsn = {
    id: random.createUuid(),
    kind: 'PropertyAsn',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    identifier: { name: node.getName() },
    shape: null,
    value: null,
  };

  if (!ctx.enter(propAsn, node)) {
    return propAsn;
  }

  propAsn.shape = node.getTypeNode() ? tsRl.as.shapes.parse(node.getTypeNode()!, ctx) : null;
  propAsn.value = node.getInitializer() ? tsRl.as.expressions.parse(node.getInitializer()!, ctx) : null;

  return ctx.leave(propAsn, node);
}
