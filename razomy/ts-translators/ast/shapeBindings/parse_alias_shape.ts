import { TypeAliasDeclaration as TsTypeAliasDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseAlias(node: TsTypeAliasDeclaration): abstracts.translators.AliasShapeBinding {
  return {
    kind: 'AliasShapeBinding',
    shapeIdentifier: tsTranslators.ast.shapes.parseShapeIdentifier(node.getNameNode()),
    shape: tsTranslators.ast.shapes.parse(node.getTypeNode()!),
    meta: { description: tsTranslators.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}
