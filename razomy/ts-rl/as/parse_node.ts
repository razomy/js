import {Node} from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';

export function parseNode(node: Node, ctx: tsRl.ast.HasEnterLeaveProduce,): abstractions.translators.AsnType[] {
  if (tsRl.ast.statements.isStatement(node)) {
    return [tsRl.ast.statements.parse(node, ctx)];
  }

  if (tsRl.ast.bindings.isBindings(node)) {
    return tsRl.ast.bindings.parse(node, ctx);
  }

  if (tsRl.ast.declarations.isDeclarations(node)) {
    return tsRl.ast.bindings.parse(node, ctx);
  }

  if (tsRl.ast.shapes.isShape(node)) {
    return [tsRl.ast.shapes.parse(node, ctx)];
  }

  if (tsRl.ast.expressions.isExpression(node)) {
    return [tsRl.ast.expressions.parse(node, ctx)];
  }

  throw new tsRl.ast.UnknownNodeException(node);
}
