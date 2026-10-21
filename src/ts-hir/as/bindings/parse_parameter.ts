import { ParameterDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as random from "@razomy/random";
import * as tsHir from "@razomy/ts-hir";

export function parseParameter(node: ParameterDeclaration, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.ParameterAsn {
  const paramAsn: abstractions.translator.ParameterAsn = {
    id: random.createUuid(),
    kind: 'ParameterAsn',
    syntaxRole: 'statement',
    identifier: { name: node.getName() },
    shape: null,
    value: null,
    modifiers: node.isRestParameter() ? [{
      id: random.createUuid(),
      kind: 'ParameterModifierAsn',
      syntaxRole: 'modifier',
      operator: 'rest',
      value: null,
    }] : [],
  };

  if (!ctx.enter(paramAsn, node)) {
    return paramAsn;
  }

  paramAsn.shape = node.getTypeNode() ? tsHir.as.shapes.parse(node.getTypeNode()!, ctx) : null;
  paramAsn.value = node.getInitializer() ? (tsHir.as.expressions.parse(node.getInitializer()!, ctx) as abstractions.translator.StateAsnType) : null;

  return ctx.leave(paramAsn, node);
}
