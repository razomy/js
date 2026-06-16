import type {EdgeKey, GraphStorage, Id, Node, QueryState, Tag} from "./type";
import {getIncomingEdges, getOutgoingEdges, getVertex} from "./storage";

export const startQuery = (storage: GraphStorage, vids: Id | Id[]): QueryState => ({
  storage,
  currentVids: Array.isArray(vids) ? vids : [vids],
});

// Переход по исходящим ребрам (OUT)
export const stepOut = (state: QueryState, edgeKey?: EdgeKey): QueryState => {
  const nextVids = new Set<Id>();
  for (const id of state.currentVids) {
    const edges = getOutgoingEdges(state.storage, id, edgeKey);
    for (const edge of edges) nextVids.add(edge.to);
  }
  return {...state, currentVids: Array.from(nextVids)};
};

// Переход по входящим ребрам (IN / REVERSELY)
export const stepIn = (state: QueryState, edgeKey?: EdgeKey): QueryState => {
  const nextVids = new Set<Id>();
  for (const id of state.currentVids) {
    const edges = getIncomingEdges(state.storage, id, edgeKey);
    for (const edge of edges) nextVids.add(edge.from);
  }
  return {...state, currentVids: Array.from(nextVids)};
};

// Фильтрация по тегам
export const filterHasTag = (state: QueryState, tag: Tag): QueryState => {
  const filtered = state.currentVids.filter(id => {
    const v = getVertex(state.storage, id)!;
    return v && v.tags.includes(tag);
  });
  return {...state, currentVids: filtered};
};

// Терминаторы (Результаты)
export const yieldIds = (state: QueryState): Id[] => state.currentVids;

export const yieldVertices = (state: QueryState): Node[] => {
  return state.currentVids
    .map(id => getVertex(state.storage, id))
    .filter((v): v is Node => v !== undefined);
};
