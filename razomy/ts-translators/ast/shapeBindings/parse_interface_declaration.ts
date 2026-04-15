import {InterfaceDeclaration as TsInterfaceDeclaration} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseInterfaceDeclaration(node: TsInterfaceDeclaration): abstracts.translators.InterfaceShapeBinding {
  return {
    kind: 'InterfaceShapeBinding',
    shapeIdentifier: tsTranslators.ast.shapes.parseShapeIdentifier(node.getNameNode()),
    extends_: [], //TODO: node.getExtends().map(e => parseTypeReferenceNode(e)),
    properties: node.getProperties().map(p => tsTranslators.ast.shapes.parsePropertyType(p)),
    meta: {description: tsTranslators.ast.doc.parseDescription(node.getNameNode()),}
  };
}

