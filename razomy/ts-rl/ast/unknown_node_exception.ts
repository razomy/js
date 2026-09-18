import { Node } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export class UnknownNodeException extends Error {
  constructor(node: Node) {
    super(`Unknown node type:${node.getKindName()}, text:${node.getText()}`);
  }
}

export function parse(node: Node): abstracts.translators.AstType[] {
  if (tsRl.ast.statements.isStatement(node)) {
    return [tsRl.ast.statements.parse(node)];
  }

  if (tsRl.ast.bindings.isBindings(node)) {
    return tsRl.ast.bindings.parse(node);
  }

  if (tsRl.ast.declarations.isDeclarations(node)) {
    return tsRl.ast.bindings.parse(node);
  }

  if (tsRl.ast.shapes.isShape(node)) {
    return [tsRl.ast.shapes.parse(node)];
  }

  if (tsRl.ast.expressions.isExpression(node)) {
    return [tsRl.ast.expressions.parse(node)];
  }

  throw new UnknownNodeException(node);
}
