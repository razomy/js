import * as abstracts from '@razomy/abstracts';

export function parseExportAssignment(node: any): abstracts.translators.AstType {
  const expression = node.getExpression();
  return {
    kind: 'MemberAst',
    syntaxLayer: 3,
    object_: { kind: 'LiteralAst', value: expression, syntaxLayer: 3, semanticLayer: 1 },
    property: { kind: 'LiteralAst', value: '', syntaxLayer: 3, semanticLayer: 1 },
  };
}
