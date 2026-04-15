import * as abstracts from '@razomy/abstracts';

export interface LRUCacheInternalMemory<K, V> {
  map: abstracts.structures.HashTable<K, abstracts.structures.DoublyLinkedListNode<[K, V]>>;
  list: abstracts.structures.DoublyLinkedList<[K, V]>;
}

/**
 * @memoryLayout Composite (Hashed + Pointer)
 * @topology 1:1_Linear
 */
export interface LRUCache<K, V> extends abstracts.collections.AbstractDataType<V, LRUCacheInternalMemory<K, V>> {
  capacity: number;
  get: (key: K) => V | undefined;
  put: (key: K, value: V) => void;
}
