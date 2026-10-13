// Imports
import { KnowledgeGraph, example } from './knowledge_graph';
export *  from './engine';
export *  from './parser';

// Named exports
export {
  KnowledgeGraph,
  example,

};

// Default export
const language = {
  KnowledgeGraph,
  example,
};

export default language;
