import {InterfaceDeclaration as TsInterfaceDeclaration} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseInterface(node: TsInterfaceDeclaration): abstracts.translators.InterfaceShapeBinding {
  return {
    kind: 'InterfaceShapeBinding',
    shapeIdentifier: tsRala.ast.shapes.parseShapeIdentifier(node.getNameNode()),
    extends_: [], //TODO: node.getExtends().map(e => parseTypeReferenceNode(e)),
    properties: node.getProperties().map((p) => tsRala.ast.shapes.parseProperty(p)),
    meta: { description: tsRala.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}

