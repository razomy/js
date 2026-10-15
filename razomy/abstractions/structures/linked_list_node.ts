import * as abstractions from '@razomy/abstractions';

export interface LinkedListNode<T> extends abstractions.structures.Node<T> {
  next: LinkedListNode<T> | null;
}

export interface DoublyLinkedListNode<T> extends LinkedListNode<T> {
  prev: DoublyLinkedListNode<T> | null;
}

/**
 * @memoryLayout Pointer
 * @topology 1:1_Linear
 */
export interface LinkedList<T> extends abstractions.arrays.DataStructure<T> {
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
export interface HashTable<K, V> extends abstractions.arrays.DataStructure<V> {
  buckets: abstractions.arrays.DynamicArray<LinkedList<[K, V]>>;
  hashFunction: (key: K) => number;
}
