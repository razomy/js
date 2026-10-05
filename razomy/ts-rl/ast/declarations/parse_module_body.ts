import { Block, SourceFile } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseModuleBody(file: SourceFile | Block, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.AsnType[] {
  const body: abstracts.translators.AsnType[] = [];
  for (const statement of file.getStatements()) {
    body.push(...tsRl.ast.parseNode(statement, ctx));
  }
  return body;
}
