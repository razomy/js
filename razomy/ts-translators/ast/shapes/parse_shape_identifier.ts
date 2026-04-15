import {Identifier as TsIdentifier, Node} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseShapeIdentifier(node: TsIdentifier | Node): abstracts.translators.ShapeIdentifier {

  const inferredType = node.getType();
  if (inferredType.isLiteral()) {
    let typeString = inferredType.getText();
    typeString = inferredType.getBaseTypeOfLiteralType().getText();
    return {
      kind: 'ShapeIdentifier',
      name: tsTranslators.ast.shapes.mapName(typeString),
    };
  }

  let name = node.getText();
  return {
    kind: 'ShapeIdentifier',
    name: tsTranslators.ast.shapes.mapName(name),
  };
}
