import type {Edge, EdgeKey, GraphStorage, Id, Node} from "./type";


export const createGraphStorage = (): GraphStorage => ({
  vertices: new Map(),
  outEdges: new Map(),
  inEdges: new Map(),
});


export const addVertexMut = (storage: GraphStorage, vertex: Node): void => {
  storage.vertices.set(vertex.id, vertex);
  if (!storage.outEdges.has(vertex.id)) storage.outEdges.set(vertex.id, []);
  if (!storage.inEdges.has(vertex.id)) storage.inEdges.set(vertex.id, []);
};

export const addEdgeMut = (storage: GraphStorage, edge: Edge): void => {
  const outList = storage.outEdges.get(edge.from) || [];
  outList.push(edge);
  storage.outEdges.set(edge.from, outList);

  const inList = storage.inEdges.get(edge.to) || [];
  inList.push(edge);
  storage.inEdges.set(edge.to, inList);
};

export const getVertex = (storage: GraphStorage, id: Id): Node | undefined => {
  return storage.vertices.get(id);
};

export const getOutgoingEdges = (storage: GraphStorage, id: Id, edgeKey?: EdgeKey): Edge[] => {
  const edges = storage.outEdges.get(id) || [];
  return edgeKey ? edges.filter(e => e.edgeKey === edgeKey) : edges;
};

export const getIncomingEdges = (storage: GraphStorage, id: Id, edgeKey?: EdgeKey): Edge[] => {
  const edges = storage.inEdges.get(id) || [];
  return edgeKey ? edges.filter(e => e.edgeKey === edgeKey) : edges;
};
