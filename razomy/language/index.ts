// Imports
import { example, KnowledgeGraph } from './knowledge_graph';
import {

  PARSER,
  parseRazomyCode,

} from './razomy_to_ast_visitor';
import { RazomyInterpreter, RazomyToTSTranspiler } from './razomy_to_ts_transpiler';

// Named exports
export {

  KnowledgeGraph,

  PARSER,

  RazomyInterpreter,
  RazomyToTSTranspiler,

  example,
  parseRazomyCode,
};

// Default export
const language: any = {
  KnowledgeGraph,
  example,

  PARSER,

  parseRazomyCode,
  RazomyInterpreter,
  RazomyToTSTranspiler,
};

export default language;
