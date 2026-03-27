import {FunctionDeclaration} from "ts-morph";
import {parseIdentifier} from "../base/parse_identifier";
import {parseParameterDeclaration} from "./parse_parameter_declaration";
import {parseReturnDeclaration} from "./parse_return_declaration";
import * as abstracts from "@razomy/abstracts";
import {parseTitleOrThrow} from "../functions/parse_title_or_throw";
import {parseExamples} from "../functions/parse_examples";
import {parseComplexity} from "../functions/parse_complexity";
import {parseFunctionDescriptionOrThrow, tryParseJsDoc} from "../functions";


export function parseFunctionDeclaration(node: FunctionDeclaration): abstracts.translators.FunctionDeclaration {
  const funcName = node.getNameOrThrow();
  const doc = tryParseJsDoc(node);
  const title = doc ? parseTitleOrThrow(doc, funcName) : '';
  const examples = doc ? parseExamples(doc, funcName) : [];
  const complexity = doc ? parseComplexity(doc, funcName) : {time: '', memory: ''};
  const isPublic = node.isExported();
  // const history = await extractPerformanceHistory(path_, funcName, parameters);
  const history = [] as [];

  return {
    kind: 'FunctionDeclaration',
    isPublic,
    identifier: node.getNameNode() ? parseIdentifier(node.getNameNode()!) : {kind: 'Identifier', name: ''},
    parameters: node.getParameters().map(p => parseParameterDeclaration(p)),
    return_: parseReturnDeclaration(node),
    isAsync: node.isAsync(),
    isGenerator: node.isGenerator(),
    description: doc ? parseFunctionDescriptionOrThrow(doc) : '',
    body: [],
    title,
    performance: {
      history,
      timeDataSizeComplexityFn: complexity.time,
      memoryDataSizeComplexityFn: complexity.memory,
    },
    examples,
  };
}
