import { VariableDeclaration as TsVariableDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseVariableBinding(
  node: TsVariableDeclaration,
): abstracts.translators.VariableBinding | abstracts.translators.VariableStatement {
  const isConst = node.getVariableStatement()?.getDeclarationKind() === 'const';
  const expression = node.getInitializer()
    ? tsTranslators.ast.expressions.parseExpression(node.getInitializer()!)
    : null;
  let shapeIdentifier = node.getTypeNode() ? tsTranslators.ast.shapes.parseShapeIdentifier(node.getTypeNode()!) : null;

  if (!expression) {
    return {
      kind: 'VariableStatement',
      identifier: tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()),
      shapeIdentifier,
      meta: { description: tsTranslators.ast.doc.parseDescription(node.getNameNode()) },
    };
  }

  return {
    kind: 'VariableBinding',
    identifier: tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()),
    modifiers: [isConst ? 'const' as const : null].filter((i) => i != null),
    shapeIdentifier,
    expression,
    meta: { description: tsTranslators.ast.doc.parseDescription(node.getNameNode()) },
  };
}
