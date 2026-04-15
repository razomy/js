import { Node } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseShape(node: Node): abstracts.translators.ShapeType {
  const literal = tsTranslators.ast.shapes.parseLiteralType(node);
  if (literal) return literal;

  const keyword = tsTranslators.ast.shapes.parseKeywordType(node);
  if (keyword) return keyword;

  if (Node.isTypeReference(node)) return tsTranslators.ast.shapes.parseReferenceNode(node);
  if (Node.isArrayTypeNode(node)) return tsTranslators.ast.shapes.parseArrayType(node);
  if (Node.isTupleTypeNode(node)) return tsTranslators.ast.shapes.parseTupleType(node);
  if (Node.isTypeLiteral(node)) return tsTranslators.ast.shapes.parseObjectType(node);
  if (Node.isUnionTypeNode(node)) return tsTranslators.ast.shapes.parseUnionType(node);
  if (Node.isIntersectionTypeNode(node)) return tsTranslators.ast.shapes.parseIntersectionType(node);
  if (Node.isTemplateLiteralTypeNode(node)) return tsTranslators.ast.shapes.parseTemplateTypeType(node);
  if (Node.isMappedTypeNode(node)) return tsTranslators.ast.shapes.parseMappedType(node);
  if (Node.isFunctionTypeNode(node)) return tsTranslators.ast.shapes.parseFunctionShape(node);
  if (Node.isIdentifier(node)) return tsTranslators.ast.shapes.parseShapeIdentifier(node);

  // TODO:
  if (Node.isConstructorTypeNode(node)) return null as any;
  if (Node.isConstructorDeclaration(node)) return null as any;
  if (Node.isTypeOperatorTypeNode(node)) return null as any;
  if (Node.isTypePredicate(node)) return null as any;
  if (Node.isIndexedAccessTypeNode(node)) return null as any;
  if (Node.isParenthesizedTypeNode(node)) return null as any;
  if (Node.isConditionalTypeNode(node)) return null as any;
  if (Node.isRestTypeNode(node)) return null as any;

  throw new Error(`Unknown Type ${node.getKindName()} '${node.getText()}'`);
}
