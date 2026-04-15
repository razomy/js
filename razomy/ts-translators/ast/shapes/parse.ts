import {Node} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';
import {isKeyword} from "./parse_keyword";

export function parse(node: Node): abstracts.translators.ShapeType {
  if (Node.isTypeReference(node)) return tsTranslators.ast.shapes.parseReferenceNode(node);
  if (Node.isArrayTypeNode(node)) return tsTranslators.ast.shapes.parseArray(node);
  if (Node.isTupleTypeNode(node)) return tsTranslators.ast.shapes.parseTuple(node);
  if (Node.isTypeLiteral(node)) return tsTranslators.ast.shapes.parseObject(node);
  if (Node.isUnionTypeNode(node)) return tsTranslators.ast.shapes.parseUnion(node);
  if (Node.isIntersectionTypeNode(node)) return tsTranslators.ast.shapes.parseIntersection(node);
  if (Node.isTemplateLiteralTypeNode(node)) return tsTranslators.ast.shapes.parseTemplate(node);
  if (Node.isMappedTypeNode(node)) return tsTranslators.ast.shapes.parseMapped(node);
  if (Node.isFunctionTypeNode(node)) return tsTranslators.ast.shapes.parseFunction(node);
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

  if (Node.isLiteralTypeNode(node)) {
    return parse(node.getLiteral());
  }

  if (isKeyword(node)) {
    return tsTranslators.ast.shapes.parseKeyword(node);
  }

  return tsTranslators.ast.shapes.parseLiteral(node);

  throw new Error(`Unknown Type ${node.getKindName()} '${node.getText()}'`);
}
