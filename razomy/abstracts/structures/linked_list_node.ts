import * as abstracts from '@razomy/abstracts';

export interface LinkedListNode<T> extends abstracts.structures.Node<T> {
  next: LinkedListNode<T> | null;
}

export interface DoublyLinkedListNode<T> extends LinkedListNode<T> {
  prev: DoublyLinkedListNode<T> | null;
}

/**
 * @memoryLayout Pointer
 * @topology 1:1_Linear
 */
export interface LinkedList<T> extends abstracts.arrays.DataStructure<T> {
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
export interface HashTable<K, V> extends abstracts.arrays.DataStructure<V> {
  buckets: abstracts.arrays.DynamicArray<LinkedList<[K, V]>>;
  hashFunction: (key: K) => number;
}
