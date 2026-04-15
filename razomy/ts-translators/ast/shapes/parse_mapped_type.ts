import { MappedTypeNode } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseMappedType(node: MappedTypeNode): abstracts.translators.MappedShape {
  const typeParam = node.getTypeParameter();
  return {
    kind: 'MappedShape',
    identifier: tsTranslators.ast.bindings.parseIdentifier(typeParam.getNameNode()),
    constraint: typeParam.getConstraint() ? tsTranslators.ast.shapes.parseShape(typeParam.getConstraint()!) as any : null as any,
    shape: node.getTypeNode() ? tsTranslators.ast.shapes.parseShape(node.getTypeNode()!) as any : null as any,
  };
}
