import { Block, SourceFile } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseModuleBody(file: SourceFile | Block): abstracts.translators.AstType[] {
  const body: abstracts.translators.AstType[] = [];
  for (const statement of file.getStatements()) {
    body.push(...tsRl.ast.bindings.parseStatement(statement));
  }
  return body;
}
