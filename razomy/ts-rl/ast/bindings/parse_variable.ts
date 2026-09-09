import { VariableDeclaration as TsVariableDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseVariable(
  node: TsVariableDeclaration,
): abstracts.translators.VariableBinding | abstracts.translators.VariableStatement {
  const isConst = node.getVariableStatement()?.getDeclarationKind() === 'const';
  const expression = node.getInitializer()
    ? tsRl.ast.expressions.parse(node.getInitializer()!)
    : null;
  let shape = node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!) : null;

  if (!expression) {
    return {
      kind: 'VariableStatement',
      identifier: tsRl.ast.bindings.parseIdentifier(node.getNameNode()),
      shape,
      meta: { description: tsRl.ast.doc.tryParseDescription(node.getNameNode()) },
    };
  }

  return {
    kind: 'VariableBinding',
    identifier: tsRl.ast.bindings.parseIdentifier(node.getNameNode()),
    modifiers: [isConst ? 'const' as const : null].filter((i) => i != null),
    shape,
    expression,
    meta: { description: tsRl.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}
