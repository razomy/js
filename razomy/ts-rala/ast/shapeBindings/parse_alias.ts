import { TypeAliasDeclaration as TsTypeAliasDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseAlias(node: TsTypeAliasDeclaration): abstracts.translators.AliasShapeBinding {
  return {
    kind: 'AliasShapeBinding',
    shapeIdentifier: tsRala.ast.shapes.parseShapeIdentifier(node.getNameNode()),
    shape: tsRala.ast.shapes.parse(node.getTypeNode()!),
    meta: { description: tsRala.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}
