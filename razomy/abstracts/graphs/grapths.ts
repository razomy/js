import * as abstracts from "@razomy/abstracts";

/**
 * @memoryLayout Composite
 * @topology N:M_Network
 */
export interface Graph<T> extends abstracts.meta.DataStructure<T> {
  isDirected: boolean;
  isWeighted: boolean;
}

/**
 * @memoryLayout Contiguous
 * @topology N:M_Network
 */
export interface GraphAdjacencyMatrix<T> extends Graph<T> {
  vertices: T[];
  matrix: number[][];
}

/**
 * @memoryLayout Pointer
 * @topology N:M_Network
 */
export interface GraphAdjacencyList<T> extends Graph<T> {
  adjacencyMap: abstracts.structures.HashTable<T, abstracts.structures.LinkedList<T>>;
}
