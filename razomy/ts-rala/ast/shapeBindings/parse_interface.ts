import {InterfaceDeclaration as TsInterfaceDeclaration} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseInterface(node: TsInterfaceDeclaration): abstracts.translators.InterfaceShapeBinding {
  return {
    kind: 'InterfaceShapeBinding',
    shapeIdentifier: tsLang.ast.shapes.parseShapeIdentifier(node.getNameNode()),
    extends_: [], //TODO: node.getExtends().map(e => parseTypeReferenceNode(e)),
    properties: node.getProperties().map((p) => tsLang.ast.shapes.parseProperty(p)),
    meta: { description: tsLang.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}

