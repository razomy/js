// Imports
import { parseCommentRange } from './parse_comment_range';
import { parseExamples } from './parse_examples';
import { parseJsDoc } from './parse_js_doc';
import { tryParseJsDoc } from './try_parse_js_doc';

// Named exports
export {
  parseCommentRange,
  parseExamples,
  parseJsDoc,
  tryParseJsDoc
};

// Default export
const doc = {
  parseCommentRange,
  parseExamples,
  parseJsDoc,
  tryParseJsDoc,
};

export default doc;
