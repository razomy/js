import * as abstractions from '@razomy/abstractions';

/**
 * @memoryLayout Composite (Hashed + Pointer)
 * @topology 1:1_Linear
 */
export interface LRUCache<K, V> extends abstractions.collections.AbstractDataType<V, LRUCacheInternalMemory<K, V>> {
  capacity: number;
  get: (key: K) => V | undefined;
  put: (key: K, value: V) => void;
}

export interface LRUCacheInternalMemory<K, V> {
  map: abstractions.structures.HashTable<K, abstractions.structures.DoublyLinkedListNode<[K, V]>>;
  list: abstractions.structures.DoublyLinkedList<[K, V]>;
}
