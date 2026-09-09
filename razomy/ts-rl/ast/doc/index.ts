// Imports
import { parseComplexity } from './parse_complexity';
import { parseExamples } from './parse_examples';
import { parseFunctionDescription } from './parse_function_description';
import { parseJsDoc } from './parse_js_doc';
import { parseReturn } from './parse_return';
import { parseTitle } from './parse_title';
import { tryParseDescription } from './try_parse_description';
import { tryParseJsDoc } from './try_parse_js_doc';

// Named exports
export {
  parseComplexity,
  parseExamples,
  parseFunctionDescription,
  parseJsDoc,
  parseReturn,
  parseTitle,
  tryParseDescription,
  tryParseJsDoc
};

// Default export
const doc = {
  parseComplexity,
  parseExamples,
  parseFunctionDescription,
  parseJsDoc,
  parseReturn,
  parseTitle,
  tryParseDescription,
  tryParseJsDoc,
};

export default doc;
