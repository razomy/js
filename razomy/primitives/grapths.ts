import type {DataStructure} from './ts_workarounds';
import type {HashTable, LinkedList} from './structures';


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
