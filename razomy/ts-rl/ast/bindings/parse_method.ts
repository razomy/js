import { type MethodDeclaration } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseMethod(node: MethodDeclaration) {
    const funcName = node.getName();
    const doc = tsRl.ast.doc.tryParseJsDoc(node as any);
    const docs: abstracts.translators.FunctionDocsAst = {
            kind: 'FunctionDocsAst', syntaxLayer: 1,
            title: doc ? tsRl.ast.doc.parseTitle(doc, funcName) : '',
            description: doc ? tsRl.ast.doc.parseFunctionDescription(doc) : '',
            parameters: {}, // Fill logically based on JSDoc parsing if needed
            timeDataSizeComplexityFn: doc ? tsRl.ast.doc.parseComplexity(doc, funcName).time : '',
            memoryDataSizeComplexityFn: doc ? tsRl.ast.doc.parseComplexity(doc, funcName).memory : '',
            examples: doc ? tsRl.ast.doc.parseExamples(doc, funcName) : []
          };
    const func: abstracts.translators.FunctionAst = {
            kind: 'FunctionAst', syntaxLayer: 3,
            identifier: { name: funcName },
            modifiers: [
              node.isAsync() ? { kind: 'FunctionModifierAst', syntaxLayer: 1, operator: 'async', value: null } : null,
              node.isGenerator() ? { kind: 'FunctionModifierAst', syntaxLayer: 1, operator: 'generator', value: null } : null
            ].filter(Boolean) as abstracts.translators.FunctionModifierAst[],
            parameters: node.getParameters().map(tsRl.ast.bindings.parseParameter),
            returnShape: node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!) : null,
            block: node.getBody()? tsRl.ast.statements.parse(node.getBody() as any) as any : { kind: 'BlockAst', syntaxLayer: 3, statements: [] },
          };
    return [docs, func];
}
