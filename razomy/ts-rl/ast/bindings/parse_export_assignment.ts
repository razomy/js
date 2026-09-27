import * as abstracts from '@razomy/abstracts';
import { ExportAssignment } from 'ts-morph';

export function parseExportAssignment(node: ExportAssignment): abstracts.translators.AstType {
  const expression = node.getExpression();
  return {
    kind: 'MemberAst',
    syntaxLayer: 'statement',
    object_: { kind: 'LiteralAst', value: expression, syntaxLayer: 'statement', semanticLayer: 'state' },
    property: { kind: 'LiteralAst', value: '', syntaxLayer: 'statement', semanticLayer: 'state' },
  };
}
