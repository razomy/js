import { PropertyDeclaration, PropertySignature as TsPropertySignature } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseProperty(
  node: TsPropertySignature | PropertyDeclaration,
): abstracts.translators.PropertyAst {
  return {
    kind: 'PropertyAst',
    identifier: tsRl.ast.bindings.parseIdentifier(node.getNameNode()),
    shape: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!) : null,
    expression: node.getInitializer() ? tsRl.ast.expressions.parse(node.getInitializer()!) : null,
    modifiers: [node.hasQuestionToken() ? 'optional' as const : null, node.isReadonly() ? 'const' as const : null].filter(
      (i) => i != null,
    ),
    meta: { description: tsRl.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}
