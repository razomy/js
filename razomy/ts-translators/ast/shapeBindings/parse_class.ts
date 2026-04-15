import {ClassDeclaration} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseClass(node: ClassDeclaration): abstracts.translators.ClassBinding {
  return {
    kind: 'ClassBinding',
    identifier: tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()!),
    extends_: [], //TODO: node.getExtends().map(e => parseTypeReferenceNode(e)),
    properties: node.getProperties().map((p) => tsTranslators.ast.bindings.parseProperty(p)),
    meta: {description: tsTranslators.ast.doc.tryParseDescription(node.getNameNode()!)},
    methods: []
  };
}
