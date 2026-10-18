export interface EdgeListGraph<N, E = N> {
  nodes: N[];
  edges: [E, E][];
}

export interface KeyEdge<TFrom, TTo = TFrom> {}
