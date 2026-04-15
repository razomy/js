import * as abstracts from "@razomy/abstracts";

export interface TreeNode<T> extends abstracts.structures.Node<T> {
  children: TreeNode<T>[];
}

/**
 * @memoryLayout Pointer
 * @topology 1:N_Hierarchical
 */
export interface Tree<T> extends abstracts.meta.DataStructure<T> {
  root: TreeNode<T> | null;
}

export interface BinaryTreeNode<T> extends abstracts.structures.Node<T> {
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;
}

/**
 * @memoryLayout Pointer
 * @topology 1:N_Hierarchical
 */
export interface BinaryTree<T> extends abstracts.meta.DataStructure<T> {
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
export interface Heap<T> extends abstracts.meta.DataStructure<T> {
  type: 'Min-Heap' | 'Max-Heap';
  array: abstracts.arrays.DynamicArray<T>;
  heapifyAlgorithm: () => void;
}

/**
 * @memoryLayout Contiguous
 * @topology 1:N_Hierarchical
 */
export interface SegmentTree<T> extends abstracts.meta.DataStructure<T> {
  build: (arr: T[]) => void;
  queryRange: (start: number, end: number) => T;
  update: (index: number, value: T) => void;
}
