import {FunctionDeclaration, ParameterDeclaration} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseParameterDeclaration(node: ParameterDeclaration): abstracts.translators.ParameterBinding {
  let description = '';
  const jsDocs = (node.getParent() as FunctionDeclaration)?.getJsDocs?.();
  if (jsDocs && jsDocs.length > 0) {
    const paramTag = jsDocs[0]
      .getTags()
      .find((t) => t.getTagName() === 'param' && t.getText().includes(node.getName()));
    if (paramTag) {
      description = paramTag.getCommentText()?.replace(/^-\s*/, '').trim() || '';
    }
  }

  return {
    kind: 'ParameterBinding',
    identifier: tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()),
    shapeIdentifier: node.getTypeNode() ? tsTranslators.ast.shapes.parseShapeIdentifier(node.getTypeNode()!) : null,
    expression: node.getInitializer() ? tsTranslators.ast.expressions.parseExpression(node.getInitializer()!) : null,
    modifiers: [node.isRestParameter() ? 'rest' as const : null].filter(i => i != null),
    meta: {description},
  };
}
