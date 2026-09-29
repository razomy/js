import {ParameterDeclaration} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseParameter(node: ParameterDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.ParameterAst {
  return {
    kind: 'ParameterAst',
    syntaxRole: 'statement',
    identifier: {name: node.getName()},
    shape: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) : null,
    value: node.getInitializer() ? tsRl.ast.expressions.parse(node.getInitializer()!, ctx) as abstracts.translators.StateAstType : null,
    modifiers: node.isRestParameter() ? [{
      kind: 'ParameterModifierAst',
      syntaxRole: 'modifier',
      operator: 'rest',
      value: null
    }] : [],
  };
}
