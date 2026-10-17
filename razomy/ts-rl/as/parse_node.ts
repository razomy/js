import {Node} from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';

export function parseNode(node: Node, ctx: abstractions.patterns.HasEnterLeave,): abstractions.translators.AsnType[] {
  if (tsRl.as.statements.isStatement(node)) {
    return [tsRl.as.statements.parse(node, ctx)];
  }

  if (tsRl.as.bindings.isBindings(node)) {
    return tsRl.as.bindings.parse(node, ctx);
  }

  if (tsRl.as.declarations.isDeclarations(node)) {
    return tsRl.as.bindings.parse(node, ctx);
  }

  if (tsRl.as.shapes.isShape(node)) {
    return [tsRl.as.shapes.parse(node, ctx)];
  }

  if (tsRl.as.expressions.isExpression(node)) {
    return [tsRl.as.expressions.parse(node, ctx)];
  }

  throw new tsRl.as.UnknownNodeException(node);
}

