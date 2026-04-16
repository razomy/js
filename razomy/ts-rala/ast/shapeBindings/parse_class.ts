import {ClassDeclaration} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsLang from "../..";

export function parseClass(node: ClassDeclaration): abstracts.translators.ClassBinding {
  return {
    kind: 'ClassBinding',
    identifier: tsLang.ast.bindings.parseIdentifier(node.getNameNode()!),
    extends_: [], //TODO: node.getExtends().map(e => parseTypeReferenceNode(e)),
    properties: node.getProperties().map((p) => tsLang.ast.bindings.parseProperty(p)),
    meta: {description: tsLang.ast.doc.tryParseDescription(node.getNameNode()!)},
    methods: []
  };
}
