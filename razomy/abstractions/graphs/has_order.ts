import * as abstractions from '@razomy/abstractions';

export interface HasOrder<T> {
  prev: T;
  next: T;
}

export interface HasParent<T> {
  parent: T;
}

export interface HasChildren<T> {
  children: T;
}

export interface TreeNode<T, R = TreeNode<T, any>[]> extends abstractions.structures.Node<T>, HasChildren<R> {
}
/**
 * @memoryLayout Pointer
 * @topology 1:N_Hierarchical
 */
export interface Tree<T, R = TreeNode<T, any>[]> extends abstractions.arrays.DataStructure<T> {
  root: TreeNode<T, R> | null;
}

export interface BinaryTreeNode<T> extends abstractions.structures.Node<T> {
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;
}

/**
 * @memoryLayout Pointer
 * @topology 1:N_Hierarchical
 */
export interface BinaryTree<T> extends abstractions.arrays.DataStructure<T> {
  root: BinaryTreeNode<T> | null;
}

/**
 * @memoryLayout Pointer
 * @topology 1:N_Hierarchical
 */
export interface BalancedTree<T> extends BinaryTree<T> {
  type: 'AVL' | 'Red-Black';
  rebalanceAlgorithm: () => void;
}

/**
 * @memoryLayout Contiguous
 * @topology 1:N_Hierarchical
 */
export interface BTree<T> extends Tree<T> {
  degree: number;
}

/**
 * @memoryLayout Pointer
 * @topology 1:N_Hierarchical
 */
export interface Trie<T> extends Tree<T> {
  isEndOfWord: boolean;
}

/**
 * @memoryLayout Contiguous
 * @topology 1:N_Hierarchical
 */
export interface Heap<T> extends abstractions.arrays.DataStructure<T> {
  type: 'Min-Heap' | 'Max-Heap';
  array: abstractions.arrays.DynamicArray<T>;
  heapifyAlgorithm: () => void;
}

/**
 * @memoryLayout Contiguous
 * @topology 1:N_Hierarchical
 */
export interface SegmentTree<T> extends abstractions.arrays.DataStructure<T> {
  build: (arr: T[]) => void;
  queryRange: (start: number, end: number) => T;
  update: (index: number, value: T) => void;
}
