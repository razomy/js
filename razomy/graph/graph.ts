export interface Graph<N, E = N> {
  nodes: N[],
  edges: [E, E][],
}