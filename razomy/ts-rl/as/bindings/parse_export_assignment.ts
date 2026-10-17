import * as abstractions from '@razomy/abstractions';
import { ExportAssignment } from 'ts-morph';
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseExportAssignment(node: ExportAssignment, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.AsnType {
  const expression = node.getExpression();
  const memberAsn: abstractions.translators.MemberAsn = {
    id: random.createUuid(),
    kind: 'MemberAsn',
    syntaxRole: 'statement',
    object_: { id: random.createUuid(), kind: 'LiteralAsn', value: expression.getText(), syntaxRole: 'statement', semanticLayer: 'state' },
    property: { id: random.createUuid(), kind: 'LiteralAsn', value: '', syntaxRole: 'statement', semanticLayer: 'state' },
  };

  if (!ctx.enter(memberAsn, node)) {
    return memberAsn;
  }

  return ctx.leave(memberAsn, node);
}