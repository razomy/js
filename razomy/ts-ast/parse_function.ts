import {FunctionDeclaration} from "ts-morph";
import {extractValidJsDoc} from "./extract_valid_js_doc";
import {extractTitle} from "./extract_title";
import {extractDescription} from "./extract_description";
import {extractParameters} from "./extract_parameters";
import {extractReturns} from "./extract_returns";
import {extractExamples} from "./extract_examples";
import {extractComplexity} from "./extract_complexity";
import type {PackageFunction} from "../abstracts/ast";

/**
 * Основная функция генерации спецификации.
 * Написана в декларативном стиле, собирает данные из функций-экстракторов.
 */
export function parseFunction(node: FunctionDeclaration) {
  const funcName = node.getNameOrThrow();

  const doc = extractValidJsDoc(node, funcName);

  const title = extractTitle(doc, funcName);
  const description = extractDescription(doc, funcName);
  const parameter = extractParameters(node, doc, funcName);
  const returns = extractReturns(node, doc, funcName);
  const examples = extractExamples(doc, funcName);
  const complexity = extractComplexity(doc, funcName);

  // const history = await extractPerformanceHistory(path_, funcName, parameters);
  const history = [] as [];
  return {
    kind: 'PackageFunction',
    name: funcName,
    functionPath: node.getSourceFile().getFilePath().split('/'),
    title,
    description,
    parameter,
    return_: returns,
    performance: {
      history,
      timeDataSizeComplexityFn: complexity.time,
      memoryDataSizeComplexityFn: complexity.memory,
    },
    examples,
  } as PackageFunction;


}
