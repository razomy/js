// Imports
import * as query from './query';
import * as storage from './storage';
import type { Edge, EdgeKey, Id, Node, Tag, Value } from './type';

// Named exports
export {
  query,
  storage
};
export type {
  Edge,
  EdgeKey,
  Id,
  Node,
  Tag,
  Value
};

// Default export
const dbGraph = {
  query,
  storage,
};


export default dbGraph;
