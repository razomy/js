import * as abstractions from '@razomy/abstractions';

export interface LinkedListNode<T> extends abstractions.structure.Node<T> {
  next: LinkedListNode<T> | null;
}

export interface DoublyLinkedListNode<T> extends LinkedListNode<T> {
  prev: DoublyLinkedListNode<T> | null;
}

/**
 * @memoryLayout Pointer
 * @topology 1:1_Linear
 */
export interface LinkedList<T> extends abstractions.array.DataStructure<T> {
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
export interface HashTable<K, V> extends abstractions.array.DataStructure<V> {
  buckets: abstractions.array.DynamicArray<LinkedList<[K, V]>>;
  hashFunction: (key: K) => number;
}
