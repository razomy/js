import {ClassDeclaration} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRala from "@razomy/ts-rala";

export function parseClass(node: ClassDeclaration): abstracts.translators.ClassBinding {
  return {
    kind: 'ClassBinding',
    identifier: tsRala.ast.bindings.parseIdentifier(node.getNameNode()!),
    extends_: [], //TODO: node.getExtends().map(e => parseTypeReferenceNode(e)),
    properties: node.getProperties().map((p) => tsRala.ast.bindings.parseProperty(p)),
    meta: {description: tsRala.ast.doc.tryParseDescription(node.getNameNode()!)},
    methods: []
  };
}
