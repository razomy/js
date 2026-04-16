import {Node} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from "../..";

export function parse(node: Node): abstracts.translators.ShapeType {
  if (Node.isTypeReference(node)) return tsLang.ast.shapes.parseReferenceNode(node);
  if (Node.isArrayTypeNode(node)) return tsLang.ast.shapes.parseArray(node);
  if (Node.isTupleTypeNode(node)) return tsLang.ast.shapes.parseTuple(node);
  if (Node.isTypeLiteral(node)) return tsLang.ast.shapes.parseObject(node);
  if (Node.isUnionTypeNode(node)) return tsLang.ast.shapes.parseUnion(node);
  if (Node.isIntersectionTypeNode(node)) return tsLang.ast.shapes.parseIntersection(node);
  if (Node.isTemplateLiteralTypeNode(node)) return tsLang.ast.shapes.parseTemplate(node);
  if (Node.isMappedTypeNode(node)) return tsLang.ast.shapes.parseMapped(node);
  if (Node.isFunctionTypeNode(node)) return tsLang.ast.shapes.parseFunction(node);
  if (Node.isIdentifier(node)) return tsLang.ast.shapes.parseShapeIdentifier(node);

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

  if (tsLang.ast.shapes.isKeyword(node)) {
    return tsLang.ast.shapes.parseKeyword(node);
  }

  return tsLang.ast.shapes.parseLiteral(node);

  throw new Error(`Unknown Type ${node.getKindName()} '${node.getText()}'`);
}
