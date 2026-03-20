import type { DynamicArray } from '../arrays/arrays';
import type { DataStructure } from '../meta/ts_workarounds';

export interface Node<T> {
  value: T;
}

export interface LinkedListNode<T> extends Node<T> {
  next: LinkedListNode<T> | null;
}

export interface DoublyLinkedListNode<T> extends LinkedListNode<T> {
  prev: DoublyLinkedListNode<T> | null;
}

/**
 * @memoryLayout Pointer
 * @topology 1:1_Linear
 */
export interface LinkedList<T> extends DataStructure<T> {
  head: LinkedListNode<T> | null;
}

/**
 * @memoryLayout Pointer
 * @topology 1:1_Linear
 */
export interface DoublyLinkedList<T> extends LinkedList<T> {
  tail: DoublyLinkedListNode<T> | null;
}

/**
 * @memoryLayout Hashed
 * @topology 1:1_Linear
 */
export interface HashTable<K, V> extends DataStructure<V> {
  buckets: DynamicArray<LinkedList<[K, V]>>;
  hashFunction: (key: K) => number;
}
