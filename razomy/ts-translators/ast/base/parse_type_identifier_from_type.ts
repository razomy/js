import {Node} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {mapName} from "./map_name";

export function parseTypeIdentifierFromType(node: Node): abstracts.translators.TypeIdentifier {
  const inferredType = node.getType();

  // 2. Get the string representation of the type (e.g., "number", "string", "boolean[]")
  let typeString = inferredType.getText();

  // Note for 'const':
  // If you have `const x = "hello"`, typeString will be the literal `"hello"`.
  // If you want "string" instead of `"hello"`, you must widen literal types:
  if (inferredType.isLiteral()) {
    typeString = inferredType.getBaseTypeOfLiteralType().getText();
    return {
      kind: 'TypeIdentifier',
      name: mapName(typeString),
    };
  }

  return {
    kind: 'TypeIdentifier',
    name: 'unknown',
  };
}
