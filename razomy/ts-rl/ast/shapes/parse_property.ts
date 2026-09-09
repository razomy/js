import { type ParameterDeclaration, type PropertySignature } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

/**
 * Helper to parse properties inside objects/interfaces
 */
export function parseProperty(node: PropertySignature | ParameterDeclaration): abstracts.translators.PropertyShape {
  return {
    kind: 'PropertyShape',
    shape: node.getTypeNode() ? (tsRl.ast.shapes.parse(node.getTypeNode()!) as any) : (null as any),
    shapeIdentifier: tsRl.ast.shapes.parseShapeIdentifier(node.getNameNode()),
    meta: { description: tsRl.ast.doc.tryParseDescription(node)! },
  };
}
