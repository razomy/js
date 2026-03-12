import type { DoublyLinkedList, DoublyLinkedListNode, HashTable } from '../structures';
import type { AbstractDataType } from './collections';

export interface LRUCacheInternalMemory<K, V> {
  map: HashTable<K, DoublyLinkedListNode<[K, V]>>;
  list: DoublyLinkedList<[K, V]>;
}

/**
 * @memoryLayout Composite (Hashed + Pointer)
 * @topology 1:1_Linear
 */
export interface LRUCache<K, V> extends AbstractDataType<V, LRUCacheInternalMemory<K, V>> {
  capacity: number;
  get: (key: K) => V | undefined;
  put: (key: K, value: V) => void;
}
