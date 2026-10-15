import {ParameterDeclaration} from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseParameter(node: ParameterDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ParameterAsn {
  return {
    kind: 'ParameterAsn',
    syntaxRole: 'statement',
    identifier: {name: node.getName()},
    shape: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) : null,
    value: node.getInitializer() ? tsRl.ast.expressions.parse(node.getInitializer()!, ctx) as abstractions.translators.StateAsnType : null,
    modifiers: node.isRestParameter() ? [{
      kind: 'ParameterModifierAsn',
      syntaxRole: 'modifier',
      operator: 'rest',
      value: null
    }] : [],
  };
}
