import {Block, Node, SourceFile} from 'ts-morph';

import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';
import {parseExport} from "./parse_export";
import {isBindings} from "./parse";
import {isStatement} from "../statements/parse";

/**
 * Parses a single SourceFile into a Module
 */
export function parseModuleBody(file: SourceFile | Block) {
  const body: abstracts.translators.DeclarationType[] = [];

  for (const statement of file.getStatements()) {
    body.push(...parseStatement(statement));
  }
  return body;
}

export function parseStatement(statement) {
  if (Node.isExportDeclaration(statement)) {
    const parsedNodes = parseExport(statement);
    return parsedNodes;
  } else if (isBindings(statement)) {
    const parsedNode = tsTranslators.ast.bindings.parse(statement);
    return [(parsedNode)];
  } else if (isStatement(statement)) {
    const parsedNode = tsTranslators.ast.statements.parse(statement);
    return [(parsedNode)];
  } else {
    throw new Error(`Unexpected statement type "${statement.getKindName()}" "${statement.getText()}"`);
  }
}
