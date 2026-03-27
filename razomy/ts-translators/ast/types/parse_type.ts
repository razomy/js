import {Node} from "ts-morph";
import {parseKeywordType} from "./parse_keyword_type";
import {parseTypeReferenceNode} from "./parse_type_reference_node";
import {parseArrayType} from "./parse_array_type";
import {parseTupleType} from "./parse_tuple_type";
import {parseObjectType} from "./parse_object_type";
import {parseUnionType} from "./parse_union_type";
import {parseIntersectionType} from "./parse_intersection_type";
import {parseMappedType} from "./parse_mapped_type";
import {parseFunctionType} from "./parse_function_type";
import * as abstracts from "@razomy/abstracts";
import {parseLiteralType} from "./parse_literal_type";
import {parseTemplateTypeType} from "./parse_template_type_type";

export function parseType(node: Node): abstracts.translators.TypeType {
  const literal = parseLiteralType(node);
  if (literal) return literal;

  const keyword = parseKeywordType(node);
  if (keyword) return keyword;

  if (Node.isTypeReference(node)) return parseTypeReferenceNode(node);
  if (Node.isArrayTypeNode(node)) return parseArrayType(node);
  if (Node.isTupleTypeNode(node)) return parseTupleType(node);
  if (Node.isTypeLiteral(node)) return parseObjectType(node);
  if (Node.isUnionTypeNode(node)) return parseUnionType(node);
  if (Node.isIntersectionTypeNode(node)) return parseIntersectionType(node);
  if (Node.isTemplateLiteralTypeNode(node)) return parseTemplateTypeType(node);
  if (Node.isMappedTypeNode(node)) return parseMappedType(node);
  if (Node.isFunctionTypeNode(node)) return parseFunctionType(node);

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
