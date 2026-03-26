import {SourceFile} from "ts-morph";

import * as abstracts from "@razomy/abstracts";
import {parseNode} from "./parse_node";

/**
 * Parses a single SourceFile into a Module
 */
export function parseModuleDeclarationBody(file: SourceFile) {
  const items: abstracts.ast.DeclarationType[] = [];

  for (const statement of file.getStatements()) {
    const parsedNode = parseNode(statement);
    if (parsedNode) {
      items.push(parsedNode);
    }
  }

  return items;
}
