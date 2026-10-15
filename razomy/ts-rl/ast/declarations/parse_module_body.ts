import { Block, SourceFile } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseModuleBody(file: SourceFile | Block, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.AsnType[] {
  const body: abstractions.translators.AsnType[] = [];
  for (const statement of file.getStatements()) {
    body.push(...tsRl.ast.parseNode(statement, ctx));
  }
  return body;
}
