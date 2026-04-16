import {Block, SourceFile} from 'ts-morph';

import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

/**
 * Parses a single SourceFile into a Module
 */
export function parseModuleBody(file: SourceFile | Block) {
  const body: abstracts.translators.DeclarationType[] = [];

  for (const statement of file.getStatements()) {
    body.push(...tsRala.ast.bindings.parseStatement(statement));
  }
  return body;
}
