import { TypeAliasDeclaration as TsTypeAliasDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseAlias(node: TsTypeAliasDeclaration): abstracts.translators.AliasShapeBinding {
  return {
    kind: 'AliasShapeBinding',
    shapeIdentifier: tsLang.ast.shapes.parseShapeIdentifier(node.getNameNode()),
    shape: tsLang.ast.shapes.parse(node.getTypeNode()!),
    meta: { description: tsLang.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}
