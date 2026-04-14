import {FunctionDeclaration} from "ts-morph";
import {parseIdentifier} from "./parse_identifier";
import {parseParameterDeclaration} from "./parse_parameter_declaration";
import * as abstracts from "@razomy/abstracts";
import {parseTitleOrThrow} from "../doc/parse_title_or_throw";
import {parseExamples} from "../doc/parse_examples";
import {parseComplexity} from "../doc/parse_complexity";
import {parseFunctionDescriptionOrThrow, parseReturnOrThrow, tryParseJsDoc} from "./index";
import {parseShapeIdentifier} from "../shapes/parse_shape_identifier";


export function parseFunctionDeclaration(node: FunctionDeclaration): abstracts.translators.FunctionBinding {
  const funcName = node.getNameOrThrow();
  const doc = tryParseJsDoc(node);
  const title = doc ? parseTitleOrThrow(doc, funcName) : '';
  const examples = doc ? parseExamples(doc, funcName) : [];
  const returnDescription = doc ? parseReturnOrThrow(doc, funcName) : "";
  const complexity = doc ? parseComplexity(doc, funcName) : {time: '', memory: ''};
  // const history = await extractPerformanceHistory(path_, funcName, parameters);
  const history = [] as [];

  return {
    kind: 'FunctionBinding',
    identifier: node.getNameNode() ? parseIdentifier(node.getNameNode()!) : {kind: 'Identifier', name: ''},
    parameters: node.getParameters().map(p => parseParameterDeclaration(p)),
    returnType: node.getReturnTypeNode() ? {
      kind: 'ReturnShape',
      shapeIdentifier: parseShapeIdentifier(node.getReturnTypeNode()!),
      meta: {description: returnDescription,}
    } : null,
    modifiers: [
      node.isAsync() ? 'async' : null,
      node.isGenerator() ? 'generator' : null,
    ].filter(i => i != null) as abstracts.translators.Modifier[],

    body: [],
    shapes: [],
    meta: {
      description: doc ? parseFunctionDescriptionOrThrow(doc) : '',
      title,
      performance: {
        history,
        timeDataSizeComplexityFn: complexity.time,
        memoryDataSizeComplexityFn: complexity.memory,
      },
      examples,
    }
  };
}
