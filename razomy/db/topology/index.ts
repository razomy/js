// Imports
import { addGraphNode } from './add_graph_node';
import { applyConnect } from './apply_connect';
import { commitGraph } from './commit_graph';
import { connectGraph } from './connect_graph';
import { createGraphTopology } from './create_graph_topology';
import { NULL_EDGE, SYSTEM_FIELDS } from './topology';
import type { GraphTopology } from './topology';

// Named exports
export {
  NULL_EDGE,
  SYSTEM_FIELDS,
  addGraphNode,
  applyConnect,
  commitGraph,
  connectGraph,
  createGraphTopology
};
export type {
  GraphTopology
};

// Default export
const topology = {
  addGraphNode,
  applyConnect,
  commitGraph,
  connectGraph,
  createGraphTopology,
  NULL_EDGE,
  SYSTEM_FIELDS,
};


export default topology;
