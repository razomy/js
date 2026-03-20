import type { DataStructure } from '../meta/ts_workarounds';
import type { HashTable, LinkedList } from '../structures/structures';

/**
 * @memoryLayout Composite
 * @topology N:M_Network
 */
export interface Graph<T> extends DataStructure<T> {
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
  adjacencyMap: HashTable<T, LinkedList<T>>;
}
