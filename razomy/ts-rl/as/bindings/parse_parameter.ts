import { ParameterDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseParameter(node: ParameterDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ParameterAsn {
  const paramAsn: abstractions.translators.ParameterAsn = {
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

  paramAsn.shape = node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) : null;
  paramAsn.value = node.getInitializer() ? (tsRl.ast.expressions.parse(node.getInitializer()!, ctx) as abstractions.translators.StateAsnType) : null;

  return ctx.leave(paramAsn, node);
}