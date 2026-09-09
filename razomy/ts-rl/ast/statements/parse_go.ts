import { BreakStatement, ContinueStatement, Node } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';

export function parseGo(node: BreakStatement | ContinueStatement): translators.BreakAst | translators.ContinueAst {
  const label = node.getLabel();
  if (Node.isBreakStatement(node)) {
    return { kind: 'BreakAst', syntaxLayer: 3, identifier: label ? { name: label.getText() } : null };
  }
  return { kind: 'ContinueAst', syntaxLayer: 3, identifier: label ? { name: label.getText() } : null };
}
