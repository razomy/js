import {TypeAliasDeclaration as TsTypeAliasDeclaration} from "ts-morph";
import {parseShape} from "../shapes/parse_shape";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../doc/parse_description";
import {parseShapeIdentifier} from "../shapes/parse_shape_identifier";

export function parseTypeAliasBinding(node: TsTypeAliasDeclaration): abstracts.translators.AliasShapeBinding {
  return {
    kind: 'AliasShapeBinding',
    shapeIdentifier: parseShapeIdentifier(node.getNameNode()),
    shape: parseShape(node.getTypeNode()!),
    meta: {description: parseDescription(node.getNameNode()),}
  };
}
