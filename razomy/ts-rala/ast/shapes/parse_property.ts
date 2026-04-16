import { type ParameterDeclaration, type PropertySignature } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

/**
 * Helper to parse properties inside objects/interfaces
 */
export function parseProperty(node: PropertySignature | ParameterDeclaration): abstracts.translators.PropertyShape {
  return {
    kind: 'PropertyShape',
    shape: node.getTypeNode() ? (tsRala.ast.shapes.parse(node.getTypeNode()!) as any) : (null as any),
    shapeIdentifier: tsRala.ast.shapes.parseShapeIdentifier(node.getNameNode()),
    meta: { description: tsRala.ast.doc.tryParseDescription(node)! },
  };
}
