import { type ParameterDeclaration, type PropertySignature } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

/**
 * Helper to parse properties inside objects/interfaces
 */
export function parseProperty(node: PropertySignature | ParameterDeclaration): abstracts.translators.PropertyShape {
  return {
    kind: 'PropertyShape',
    shape: node.getTypeNode() ? (tsTranslators.ast.shapes.parse(node.getTypeNode()!) as any) : (null as any),
    shapeIdentifier: tsTranslators.ast.shapes.parseShapeIdentifier(node.getNameNode()),
    meta: { description: tsTranslators.ast.doc.tryParseDescription(node)! },
  };
}
