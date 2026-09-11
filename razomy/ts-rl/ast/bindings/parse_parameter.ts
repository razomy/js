import {ParameterDeclaration} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseParameter(node: ParameterDeclaration): abstracts.translators.ParameterAst {
  return {
    kind: 'ParameterAst',
    syntaxLayer: 3,
    identifier: {name: node.getName()},
    shape: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!) : null,
    value: node.getInitializer() ? tsRl.ast.expressions.parse(node.getInitializer()!) as abstracts.translators.StateAstType : null,
    modifiers: node.isRestParameter() ? [{
      kind: 'ParameterModifierAst',
      syntaxLayer: 1,
      operator: 'rest',
      value: null
    }] : [],
  };
}
