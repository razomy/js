import { VariableDeclaration as TsVariableDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseVariable(
  node: TsVariableDeclaration,
): abstracts.translators.VariableBinding | abstracts.translators.VariableStatement {
  const isConst = node.getVariableStatement()?.getDeclarationKind() === 'const';
  const expression = node.getInitializer()
    ? tsRala.ast.expressions.parse(node.getInitializer()!)
    : null;
  let shape = node.getTypeNode() ? tsRala.ast.shapes.parse(node.getTypeNode()!) : null;

  if (!expression) {
    return {
      kind: 'VariableStatement',
      identifier: tsRala.ast.bindings.parseIdentifier(node.getNameNode()),
      shape,
      meta: { description: tsRala.ast.doc.tryParseDescription(node.getNameNode()) },
    };
  }

  return {
    kind: 'VariableBinding',
    identifier: tsRala.ast.bindings.parseIdentifier(node.getNameNode()),
    modifiers: [isConst ? 'const' as const : null].filter((i) => i != null),
    shape,
    expression,
    meta: { description: tsRala.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}
