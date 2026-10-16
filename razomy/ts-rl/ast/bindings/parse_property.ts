import { PropertyDeclaration } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseProperty(node: PropertyDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.PropertyAsn {
  const propAsn: abstractions.translators.PropertyAsn = {
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

  propAsn.shape = node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) : null;
  propAsn.value = node.getInitializer() ? tsRl.ast.expressions.parse(node.getInitializer()!, ctx) : null;

  return ctx.leave(propAsn, node);
}