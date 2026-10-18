import * as abstractions from '@razomy/abstractions';

/**
 * @memoryLayout Composite (Hashed + Pointer)
 * @topology 1:1_Linear
 */
export interface LRUCache<K, V> extends abstractions.collection.AbstractDataType<V, LRUCacheInternalMemory<K, V>> {
  capacity: number;
  get: (key: K) => V | undefined;
  put: (key: K, value: V) => void;
}

export interface LRUCacheInternalMemory<K, V> {
  map: abstractions.structure.HashTable<K, abstractions.structure.DoublyLinkedListNode<[K, V]>>;
  list: abstractions.structure.DoublyLinkedList<[K, V]>;
}
