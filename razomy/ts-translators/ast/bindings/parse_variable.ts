import { VariableDeclaration as TsVariableDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseVariable(
  node: TsVariableDeclaration,
): abstracts.translators.VariableBinding | abstracts.translators.VariableStatement {
  const isConst = node.getVariableStatement()?.getDeclarationKind() === 'const';
  const expression = node.getInitializer()
    ? tsTranslators.ast.expressions.parse(node.getInitializer()!)
    : null;
  let shape = node.getTypeNode() ? tsTranslators.ast.shapes.parse(node.getTypeNode()!) : null;

  if (!expression) {
    return {
      kind: 'VariableStatement',
      identifier: tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()),
      shape,
      meta: { description: tsTranslators.ast.doc.tryParseDescription(node.getNameNode()) },
    };
  }

  return {
    kind: 'VariableBinding',
    identifier: tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()),
    modifiers: [isConst ? 'const' as const : null].filter((i) => i != null),
    shape,
    expression,
    meta: { description: tsTranslators.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}
