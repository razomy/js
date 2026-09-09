import { Block, SourceFile } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parseStatement } from "./parse_statement";

export function parseModuleBody(file: SourceFile | Block): translators.AstType[] {
  const body: translators.AstType[] = [];
  for (const statement of file.getStatements()) {
    body.push(...parseStatement(statement));
  }
  return body;
}
