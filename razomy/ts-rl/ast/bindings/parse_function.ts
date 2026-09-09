import { FunctionDeclaration } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { tryParseJsDoc, parseTitle, parseExamples, parseComplexity, parseFunctionDescription } from '../doc';
import { parseParameter } from './parse_parameter';
import { parseBlock } from '../statements/parse_block';
import { parse as parseShape } from '../shapes/parse';

export function parseFunction(node: FunctionDeclaration): translators.AstType[] {
  const funcName = node.getNameOrThrow();
  const doc = tryParseJsDoc(node);
  
  const docs: translators.FunctionDocsAst = {
    kind: 'FunctionDocsAst', syntaxLayer: 1,
    title: doc ? parseTitle(doc, funcName) : '',
    description: doc ? parseFunctionDescription(doc) : '',
    parameters: {}, // Fill logically based on JSDoc parsing if needed
    performance: {
       timeDataSizeComplexityFn: doc ? parseComplexity(doc, funcName).time : '',
       memoryDataSizeComplexityFn: doc ? parseComplexity(doc, funcName).memory : '',
       history: []
    },
    examples: doc ? parseExamples(doc, funcName) : []
  };

  const func: translators.FunctionAst = {
    kind: 'FunctionAst', syntaxLayer: 3,
    identifier: { name: funcName },
    modifiers: [
      node.isAsync() ? { kind: 'FunctionModifierAst', syntaxLayer: 1, operator: 'async', value: null } : null,
      node.isGenerator() ? { kind: 'FunctionModifierAst', syntaxLayer: 1, operator: 'generator', value: null } : null
    ].filter(Boolean) as translators.FunctionModifierAst[],
    parameters: node.getParameters().map(parseParameter),
    returnShape: node.getReturnTypeNode() ? parseShape(node.getReturnTypeNode()!) : null,
    block: parseBlock(node.getBody() as any),
  };

  return [docs, func];
}
