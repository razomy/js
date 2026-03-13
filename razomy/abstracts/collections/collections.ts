import type { DynamicArray } from '../arrays';
import type { DoublyLinkedList, HashTable, LinkedList } from '../structures';
import type { BalancedTree, Heap } from '../graphs';
import type { RingBuffer } from '../structures';

export type DictionaryObject<K extends PropertyKey, V> = Record<K, V>;

export interface AbstractDataType<_T, Underlying> {
  underlyingStructure: Underlying;
}

export interface Stack<T> extends AbstractDataType<T, DynamicArray<T> | LinkedList<T>> {
  push: (item: T) => void;
  pop: () => T | undefined;
  peek: () => T | undefined;
}

export interface Queue<T> extends AbstractDataType<T, LinkedList<T> | RingBuffer<T>> {
  enqueue: (item: T) => void;
  dequeue: () => T | undefined;
  peek: () => T | undefined;
}

export interface Deque<T> extends AbstractDataType<T, DoublyLinkedList<T> | DynamicArray<T>> {
  pushFront: (item: T) => void;
  pushBack: (item: T) => void;
  popFront: () => T | undefined;
  popBack: () => T | undefined;
}

export interface PriorityQueue<T> extends AbstractDataType<T, Heap<T>> {
  enqueue: (item: T, priority: number) => void;
  dequeueHighestPriority: () => T | undefined;
}

export interface DictionaryMap<K, V> extends AbstractDataType<V, HashTable<K, V> | BalancedTree<[K, V]>> {
  set: (key: K, value: V) => void;
  get: (key: K) => V | undefined;
  has: (key: K) => boolean;
  delete_: (key: K) => boolean;
}

export interface Set<T> extends AbstractDataType<T, HashTable<T, boolean> | BalancedTree<T>> {
  add: (item: T) => void;
  has: (item: T) => boolean;
  delete_: (item: T) => boolean;
}
