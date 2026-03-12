import type {DataStructure} from './ts_workarounds';
import type {DynamicArray} from './arrays';
import type {Node} from './structures';

/**
 * @memoryLayout Contiguous
 * @topology 1:1_Linear (Ring)
 */
export interface RingBuffer<T> extends DataStructure<T> {
  capacity: number;
  head: number;
  tail: number;
  buffer: DynamicArray<T>;
}

export interface SkipListNode<T> extends Node<T> {
  forward: SkipListNode<T>[];
}

/**
 * @memoryLayout Pointer
 * @topology 1:N_Hierarchical
 */
export interface SkipList<T> extends DataStructure<T> {
  head: SkipListNode<T> | null;
  maxLevel: number;
}

/**
 * @memoryLayout Contiguous
 * @topology 1:N_Hierarchical (Forest)
 */
export interface DisjointSet<T> extends DataStructure<T> {
  parent: Map<T, T>;
  rank: Map<T, number>;
  find: (item: T) => T;
  union: (itemA: T, itemB: T) => void;
}
