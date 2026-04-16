import { VariableDeclaration as TsVariableDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseVariable(
  node: TsVariableDeclaration,
): abstracts.translators.VariableBinding | abstracts.translators.VariableStatement {
  const isConst = node.getVariableStatement()?.getDeclarationKind() === 'const';
  const expression = node.getInitializer()
    ? tsLang.ast.expressions.parse(node.getInitializer()!)
    : null;
  let shape = node.getTypeNode() ? tsLang.ast.shapes.parse(node.getTypeNode()!) : null;

  if (!expression) {
    return {
      kind: 'VariableStatement',
      identifier: tsLang.ast.bindings.parseIdentifier(node.getNameNode()),
      shape,
      meta: { description: tsLang.ast.doc.tryParseDescription(node.getNameNode()) },
    };
  }

  return {
    kind: 'VariableBinding',
    identifier: tsLang.ast.bindings.parseIdentifier(node.getNameNode()),
    modifiers: [isConst ? 'const' as const : null].filter((i) => i != null),
    shape,
    expression,
    meta: { description: tsLang.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}
