import { type ParameterDeclaration, type PropertySignature } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

/**
 * Helper to parse properties inside objects/interfaces
 */
export function parseProperty(node: PropertySignature | ParameterDeclaration): abstracts.translators.PropertyShape {
  return {
    kind: 'PropertyShape',
    shape: node.getTypeNode() ? (tsLang.ast.shapes.parse(node.getTypeNode()!) as any) : (null as any),
    shapeIdentifier: tsLang.ast.shapes.parseShapeIdentifier(node.getNameNode()),
    meta: { description: tsLang.ast.doc.tryParseDescription(node)! },
  };
}
