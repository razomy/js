import {FunctionDeclaration} from "ts-morph";
import {parseIdentifier} from "../base/parse_identifier";
import {parseParameterDeclaration} from "./parse_parameter_declaration";
import * as abstracts from "@razomy/abstracts";
import {parseTitleOrThrow} from "../functions/parse_title_or_throw";
import {parseExamples} from "../functions/parse_examples";
import {parseComplexity} from "../functions/parse_complexity";
import {parseFunctionDescriptionOrThrow, tryParseJsDoc} from "../functions";
import {parseTypeIdentifier} from "../base";


export function parseFunctionDeclaration(node: FunctionDeclaration): abstracts.translators.FunctionBinding {
  const funcName = node.getNameOrThrow();
  const doc = tryParseJsDoc(node);
  const title = doc ? parseTitleOrThrow(doc, funcName) : '';
  const examples = doc ? parseExamples(doc, funcName) : [];
  const complexity = doc ? parseComplexity(doc, funcName) : {time: '', memory: ''};
  // const history = await extractPerformanceHistory(path_, funcName, parameters);
  const history = [] as [];

  return {
    kind: 'FunctionBinding',
    identifier: node.getNameNode() ? parseIdentifier(node.getNameNode()!) : {kind: 'Identifier', name: ''},
    parameters: node.getParameters().map(p => parseParameterDeclaration(p)),
    returnType: node.getReturnTypeNode() ? parseTypeIdentifier(node.getReturnTypeNode()!): null,
    isAsync: node.isAsync(),
    isGenerator: node.isGenerator(),
    description: doc ? parseFunctionDescriptionOrThrow(doc) : '',
    body: null,
    types: [],
    title,
    performance: {
      history,
      timeDataSizeComplexityFn: complexity.time,
      memoryDataSizeComplexityFn: complexity.memory,
    },
    examples,
  };
}
