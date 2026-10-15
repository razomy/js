import * as abstractions from '@razomy/abstractions';
import { ExportAssignment } from 'ts-morph';
import * as tsRl from "@razomy/ts-rl";

export function parseExportAssignment(node: ExportAssignment, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.AsnType {
  const expression = node.getExpression();
  return {
    kind: 'MemberAsn',
    syntaxRole: 'statement',
    object_: { kind: 'LiteralAsn', value: expression, syntaxRole: 'statement', semanticLayer: 'state' },
    property: { kind: 'LiteralAsn', value: '', syntaxRole: 'statement', semanticLayer: 'state' },
  };
}
