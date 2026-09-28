import { type MethodDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parseMethod(node: MethodDeclaration) {
  const funcName = node.getName();
  const jsDoc = tsRl.ast.doc.tryParseJsDoc(node);
  const docs = jsDoc ? tsRl.ast.doc.parseJsDoc(jsDoc) : null;

  const func: abstracts.translators.FunctionAst = {
    kind: 'FunctionAst',
    syntaxRole: 'statement',
    identifier: { name: funcName },
    modifiers: [
      node.isAsync() ? { kind: 'FunctionModifierAst', syntaxRole: 'modifier', operator: 'async', value: null } : null,
      node.isGenerator()
        ? { kind: 'FunctionModifierAst', syntaxRole: 'modifier', operator: 'generator', value: null }
        : null,
    ].filter(Boolean) as abstracts.translators.FunctionModifierAst[],
    parameters: node.getParameters().map(tsRl.ast.bindings.parseParameter),
    returnShape: node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!) : null,
    block: node.getBody()
      ? (tsRl.ast.statements.parse(node.getBody() as any) as any)
      : { kind: 'BlockAst', syntaxRole: 'statement', statements: [] },
  };
  return [docs, func].filter(Boolean);
}
