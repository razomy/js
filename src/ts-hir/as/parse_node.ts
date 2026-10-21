import {Node} from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsHir from "@razomy/ts-hir";

export function parseNode(node: Node, ctx: abstractions.patterns.HasEnterLeave,): abstractions.translator.AsnType[] {
  if (tsHir.as.statements.isStatement(node)) {
    return [tsHir.as.statements.parse(node, ctx)];
  }

  if (tsHir.as.bindings.isBindings(node)) {
    return tsHir.as.bindings.parse(node, ctx);
  }

  if (tsHir.as.declarations.isDeclarations(node)) {
    return tsHir.as.bindings.parse(node, ctx);
  }

  if (tsHir.as.shapes.isShape(node)) {
    return [tsHir.as.shapes.parse(node, ctx)];
  }

  if (tsHir.as.expressions.isExpression(node)) {
    return [tsHir.as.expressions.parse(node, ctx)];
  }

  throw new tsHir.as.UnknownNodeException(node);
}

