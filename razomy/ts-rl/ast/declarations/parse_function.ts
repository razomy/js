import { FunctionDeclaration } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseFunction(node: FunctionDeclaration): abstracts.translators.AstType[] {
  const funcName = node.getNameOrThrow();
  const jsDoc = tsRl.ast.doc.tryParseJsDoc(node);
  const docs = jsDoc ? tsRl.ast.doc.parseJsDoc(jsDoc): null;

  const func: abstracts.translators.FunctionAst = {
    kind: 'FunctionAst', syntaxLayer: 'statement',
    identifier: { name: funcName },
    modifiers: [
      node.isAsync() ? { kind: 'FunctionModifierAst', syntaxLayer: 'text', operator: 'async', value: null } : null,
      node.isGenerator() ? { kind: 'FunctionModifierAst', syntaxLayer: 'text', operator: 'generator', value: null } : null
    ].filter(Boolean) as abstracts.translators.FunctionModifierAst[],
    parameters: node.getParameters().map(tsRl.ast.bindings.parseParameter),
    returnShape: node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!) : null,
    block: node.getBody()? tsRl.ast.statements.parse(node.getBody() as any) as any : { kind: 'BlockAst', syntaxLayer: 'statement', statements: [] },
  };

  return [docs, func].filter(Boolean);
}
