import { Block, type ModuleDeclaration, SourceFile } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseModuleBody(file: SourceFile | Block | ModuleDeclaration, ctx: abstractions.patterns.HasEnterLeave): abstractions.translators.AsnType[] {
  const body: abstractions.translators.AsnType[] = [];
  for (const statement of file.getStatements()) {
    body.push(...tsRl.as.parseNode(statement, ctx));
  }
  return body;
}
