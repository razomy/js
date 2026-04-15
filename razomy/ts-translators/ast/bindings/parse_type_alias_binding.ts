import {TypeAliasDeclaration as TsTypeAliasDeclaration} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseTypeAliasBinding(node: TsTypeAliasDeclaration): abstracts.translators.AliasShapeBinding {
  return {
    kind: 'AliasShapeBinding',
    shapeIdentifier: tsTranslators.ast.shapes.parseShapeIdentifier(node.getNameNode()),
    shape: tsTranslators.ast.shapes.parseShape(node.getTypeNode()!),
    meta: {description: tsTranslators.ast.doc.parseDescription(node.getNameNode()),}
  };
}
