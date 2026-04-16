import {FunctionDeclaration, ParameterDeclaration} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseParameter(node: ParameterDeclaration): abstracts.translators.ParameterBinding {
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
    identifier: tsLang.ast.bindings.parseIdentifier(node.getNameNode()),
    shape: node.getTypeNode() ? tsLang.ast.shapes.parse(node.getTypeNode()!) : null,
    expression: node.getInitializer() ? tsLang.ast.expressions.parse(node.getInitializer()!) : null,
    modifiers: [node.isRestParameter() ? 'rest' as const : null].filter(i => i != null),
    meta: {description},
  };
}
