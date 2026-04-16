import {Node} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parse(node: Node): abstracts.translators.ShapeType {
  if (Node.isTypeReference(node)) return tsRala.ast.shapes.parseReferenceNode(node);
  if (Node.isArrayTypeNode(node)) return tsRala.ast.shapes.parseArray(node);
  if (Node.isTupleTypeNode(node)) return tsRala.ast.shapes.parseTuple(node);
  if (Node.isTypeLiteral(node)) return tsRala.ast.shapes.parseObject(node);
  if (Node.isUnionTypeNode(node)) return tsRala.ast.shapes.parseUnion(node);
  if (Node.isIntersectionTypeNode(node)) return tsRala.ast.shapes.parseIntersection(node);
  if (Node.isTemplateLiteralTypeNode(node)) return tsRala.ast.shapes.parseTemplate(node);
  if (Node.isMappedTypeNode(node)) return tsRala.ast.shapes.parseMapped(node);
  if (Node.isFunctionTypeNode(node)) return tsRala.ast.shapes.parseFunction(node);
  if (Node.isIdentifier(node)) return tsRala.ast.shapes.parseShapeIdentifier(node);

  // TODO:
  if (Node.isConstructorTypeNode(node)) return null as any;
  if (Node.isConstructorDeclaration(node)) return null as any;
  if (Node.isTypeOperatorTypeNode(node)) return null as any;
  if (Node.isTypePredicate(node)) return null as any;
  if (Node.isIndexedAccessTypeNode(node)) return null as any;
  if (Node.isParenthesizedTypeNode(node)) return null as any;
  if (Node.isConditionalTypeNode(node)) return null as any;
  if (Node.isRestTypeNode(node)) return null as any;

  if (Node.isLiteralTypeNode(node)) {
    return parse(node.getLiteral());
  }

  if (tsRala.ast.shapes.isKeyword(node)) {
    return tsRala.ast.shapes.parseKeyword(node);
  }

  return tsRala.ast.shapes.parseLiteral(node);

  throw new Error(`Unknown Type ${node.getKindName()} '${node.getText()}'`);
}
