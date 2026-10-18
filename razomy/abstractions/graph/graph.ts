import * as abstractions from '@razomy/abstractions';

/**
 * @memoryLayout Composite
 * @topology N:M_Network
 */
export interface Graph<T> extends abstractions.array.DataStructure<T> {
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
  adjacencyMap: abstractions.structure.HashTable<T, abstractions.structure.LinkedList<T>>;
}
