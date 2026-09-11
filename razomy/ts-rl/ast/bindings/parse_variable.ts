import { VariableDeclaration as TsVariableDeclaration, Node } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseVariable(node: TsVariableDeclaration): abstracts.translators.InstanceAst {
  // FIX: In a `for` loop, there is no VariableStatement. We check the parent List instead.
  const parent = node.getParent();
  const isConst = Node.isVariableDeclarationList(parent)
    ? parent.getDeclarationKind() === 'const'
    : node.getVariableStatement()?.getDeclarationKind() === 'const';

  return {
    kind: 'InstanceAst',
    syntaxLayer: 3,
    modifiers: isConst ? [{ kind: 'InstanceModifierAst', syntaxLayer: 1, operator: 'const', value: null }] : [],
    identifier: { name: node.getName() },
    shape: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!) : null,
    value: node.getInitializer() ? tsRl.ast.expressions.parse(node.getInitializer()!) as abstracts.translators.StateAstType : { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: undefined },
  };
}
