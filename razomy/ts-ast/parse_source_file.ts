import { SourceFile} from "ts-morph";
import {parseNode} from "./parse_node";
import * as abstracts from "@razomy/abstracts";

/**
 * Parses a single SourceFile into a Module
 */
export function parseSourceFile(file: SourceFile) {
  const items: abstracts.ast.Any[] = [];

  // Iterate over top-level statements
  for (const statement of file.getStatements()) {
    const parsedNode = parseNode(statement);
    if (parsedNode) {
      // Unroll variable statements (which can contain multiple declarations)
      if (Array.isArray(parsedNode)) {
        items.push(...parsedNode);
      } else {
        items.push(parsedNode as abstracts.ast.Any);
      }
    }
  }

  return {
    kind: 'Module',
    items
  } satisfies abstracts.ast.Module;
}
