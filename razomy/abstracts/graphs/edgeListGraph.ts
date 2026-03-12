export interface EdgeListGraph<N, E = N> {
  nodes: N[];
  edges: [E, E][];
}
