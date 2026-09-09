import { Identifier as TsIdentifier, Node } from "ts-morph";
import * as translators from '@razomy/abstracts/translators';

export function parseReference(node: TsIdentifier | Node): translators.ReferenceAst {
  return { kind: 'ReferenceAst', syntaxLayer: 2, identifier: { name: node.getText() } };
}
