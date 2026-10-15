import * as abstractions from '@razomy/abstractions';

/**
 * @memoryLayout Contiguous
 * @topology 1:1_Linear (Ring)
 */
export interface RingBuffer<T> extends abstractions.arrays.DataStructure<T> {
  capacity: number;
  head: number;
  tail: number;
  buffer: abstractions.arrays.DynamicArray<T>;
}

export interface SkipListNode<T> extends abstractions.structures.Node<T> {
  forward: SkipListNode<T>[];
}

/**
 * @memoryLayout Pointer
 * @topology 1:N_Hierarchical
 */
export interface SkipList<T> extends abstractions.arrays.DataStructure<T> {
  head: SkipListNode<T> | null;
  maxLevel: number;
}

/**
 * @memoryLayout Contiguous
 * @topology 1:N_Hierarchical (Forest)
 */
export interface DisjointSet<T> extends abstractions.arrays.DataStructure<T> {
  parent: Map<T, T>;
  rank: Map<T, number>;
  find: (item: T) => T;
  union: (itemA: T, itemB: T) => void;
}
