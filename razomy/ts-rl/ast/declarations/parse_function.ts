import { FunctionDeclaration } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseFunction(node: FunctionDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.AsnType[] {
  const funcName = node.getNameOrThrow();
  const jsDoc = tsRl.ast.doc.tryParseJsDoc(node, ctx);
  const docs = jsDoc ? tsRl.ast.doc.parseJsDoc(jsDoc, ctx): null;

  const func: abstracts.translators.FunctionAsn = {
    kind: 'FunctionAsn', syntaxRole: 'statement',
    identifier: { name: funcName },
    modifiers: [
      node.isAsync() ? { kind: 'FunctionModifierAsn', syntaxRole: 'modifier', operator: 'async', value: null } : null,
      node.isGenerator() ? { kind: 'FunctionModifierAsn', syntaxRole: 'modifier', operator: 'generator', value: null } : null
    ].filter(Boolean) as abstracts.translators.FunctionModifierAsn[],
    parameters: node.getParameters().map(i=>tsRl.ast.bindings.parseParameter(i,ctx)),
    returnShape: node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!, ctx) : null,
    block: node.getBody()? tsRl.ast.statements.parse(node.getBody() as any, ctx) as any : { kind: 'BlockAsn', syntaxRole: 'statement', statements: [] },
  };

  return [docs, func].filter(Boolean);
}
