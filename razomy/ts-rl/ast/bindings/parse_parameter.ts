import {ParameterDeclaration} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseParameter(node: ParameterDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.ParameterAsn {
  return {
    kind: 'ParameterAsn',
    syntaxRole: 'statement',
    identifier: {name: node.getName()},
    shape: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) : null,
    value: node.getInitializer() ? tsRl.ast.expressions.parse(node.getInitializer()!, ctx) as abstracts.translators.StateAsnType : null,
    modifiers: node.isRestParameter() ? [{
      kind: 'ParameterModifierAsn',
      syntaxRole: 'modifier',
      operator: 'rest',
      value: null
    }] : [],
  };
}
