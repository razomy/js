import * as abstracts from '@razomy/abstracts';

/**
 * @memoryLayout Contiguous
 * @topology 1:1_Linear (Ring)
 */
export interface RingBuffer<T> extends abstracts.meta.DataStructure<T> {
  capacity: number;
  head: number;
  tail: number;
  buffer: abstracts.arrays.DynamicArray<T>;
}

export interface SkipListNode<T> extends abstracts.structures.Node<T> {
  forward: SkipListNode<T>[];
}

/**
 * @memoryLayout Pointer
 * @topology 1:N_Hierarchical
 */
export interface SkipList<T> extends abstracts.meta.DataStructure<T> {
  head: SkipListNode<T> | null;
  maxLevel: number;
}

/**
 * @memoryLayout Contiguous
 * @topology 1:N_Hierarchical (Forest)
 */
export interface DisjointSet<T> extends abstracts.meta.DataStructure<T> {
  parent: Map<T, T>;
  rank: Map<T, number>;
  find: (item: T) => T;
  union: (itemA: T, itemB: T) => void;
}
