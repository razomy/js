// Imports
import { addEdgeMut } from './add_edge_mut';
import { addVertexMut } from './add_vertex_mut';
import { createGraphStorage } from './create_graph_storage';
import { getIncomingEdges } from './get_incoming_edges';
import { getOutgoingEdges } from './get_outgoing_edges';
import { getVertex } from './get_vertex';
import type { GraphStorage } from './graph_storage';

// Named exports
export {
  addEdgeMut,
  addVertexMut,
  createGraphStorage,
  getIncomingEdges,
  getOutgoingEdges,
  getVertex
};
export type {
  GraphStorage
};

// Default export
const storage = {
  addEdgeMut,
  addVertexMut,
  createGraphStorage,
  getIncomingEdges,
  getOutgoingEdges,
  getVertex,
};


export default storage;
