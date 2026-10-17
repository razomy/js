import { FunctionDeclaration } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseFunction(node: FunctionDeclaration, ctx: abstractions.patterns.HasEnterLeave): abstractions.translators.AsnType[] {
  const funcName = node.getNameOrThrow();
  const jsDoc = tsRl.as.doc.tryParseJsDoc(node, ctx);
  const docs = jsDoc ? tsRl.as.doc.parseJsDoc(jsDoc, ctx) : null;

  const func: abstractions.translators.FunctionAsn = {
    id: random.createUuid(),
    kind: 'FunctionAsn',
    syntaxRole: 'statement',
    identifier: { name: funcName },
    modifiers: [
      node.isExported() ? { id: random.createUuid(), kind: 'AccessModifierAsn', syntaxRole: 'modifier', operator: 'public', value: null } : null,
      node.isAsync() ? { id: random.createUuid(), kind: 'FunctionModifierAsn', syntaxRole: 'modifier', operator: 'async', value: null } : null,
      node.isGenerator() ? { id: random.createUuid(), kind: 'FunctionModifierAsn', syntaxRole: 'modifier', operator: 'generator', value: null } : null,
    ].filter(Boolean) as abstractions.translators.FunctionModifierAsn[],
    parameters: [],
    returnShape: null,
    block: null as any,
  };

  if (!ctx.enter(func, node)) {
    return [];
  }

  func.parameters = node.getParameters().map(i => tsRl.as.bindings.parseParameter(i, ctx));
  func.returnShape = node.getReturnTypeNode() ? tsRl.as.shapes.parse(node.getReturnTypeNode()!, ctx) : null;
  func.block = node.getBody()
    ? (tsRl.as.statements.parse(node.getBody() as any, ctx) as any)
    : { id: random.createUuid(), kind: 'BlockAsn', syntaxRole: 'statement', statements: [] };

  return [docs, ctx.leave(func, node)].filter(Boolean) as abstractions.translators.AsnType[];
}
