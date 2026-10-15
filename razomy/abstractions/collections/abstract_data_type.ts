import * as abstractions from '@razomy/abstractions';

export type DictionaryObject<K extends PropertyKey, V> = Record<K, V>;

export interface AbstractDataType<_T, Underlying> {
  underlyingStructure: Underlying;
}

export interface Stack<T>
  extends AbstractDataType<T, abstractions.arrays.DynamicArray<T> | abstractions.structures.LinkedList<T>> {
  push: (item: T) => void;
  pop: () => T | undefined;
  peek: () => T | undefined;
}

export interface Queue<T>
  extends AbstractDataType<T, abstractions.structures.LinkedList<T> | abstractions.structures.RingBuffer<T>> {
  enqueue: (item: T) => void;
  dequeue: () => T | undefined;
  peek: () => T | undefined;
}

export interface Deque<T>
  extends AbstractDataType<T, abstractions.structures.DoublyLinkedList<T> | abstractions.arrays.DynamicArray<T>> {
  pushFront: (item: T) => void;
  pushBack: (item: T) => void;
  popFront: () => T | undefined;
  popBack: () => T | undefined;
}

export interface PriorityQueue<T> extends AbstractDataType<T, abstractions.graphs.Heap<T>> {
  enqueue: (item: T, priority: number) => void;
  dequeueHighestPriority: () => T | undefined;
}

export interface DictionaryMap<K, V>
  extends AbstractDataType<V, abstractions.structures.HashTable<K, V> | abstractions.graphs.BalancedTree<[K, V]>> {
  set: (key: K, value: V) => void;
  get: (key: K) => V | undefined;
  has: (key: K) => boolean;
  delete_: (key: K) => boolean;
}

export interface Set<T>
  extends AbstractDataType<T, abstractions.structures.HashTable<T, boolean> | abstractions.graphs.BalancedTree<T>> {
  add: (item: T) => void;
  has: (item: T) => boolean;
  delete_: (item: T) => boolean;
}
