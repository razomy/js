import * as abstracts from '@razomy/abstracts';
import { ExportAssignment } from 'ts-morph';

export function parseExportAssignment(node: ExportAssignment): abstracts.translators.AstType {
  const expression = node.getExpression();
  return {
    kind: 'MemberAst',
    syntaxRole: 'statement',
    object_: { kind: 'LiteralAst', value: expression, syntaxRole: 'statement', semanticLayer: 'state' },
    property: { kind: 'LiteralAst', value: '', syntaxRole: 'statement', semanticLayer: 'state' },
  };
}
