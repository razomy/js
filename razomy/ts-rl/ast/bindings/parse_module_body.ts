import {Block, SourceFile} from 'ts-morph';

import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

/**
 * Parses a single SourceFile into a Module
 */
export function parseModuleBody(file: SourceFile | Block) {
  const body: abstracts.translators.DeclarationAstType[] = [];

  for (const statement of file.getStatements()) {
    body.push(...tsRl.ast.bindings.parseStatement(statement));
  }
  return body;
}
