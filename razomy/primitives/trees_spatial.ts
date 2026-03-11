import type {DataStructure} from './ts_workarounds';
import type {Node} from './structures';

export interface QuadTreeNode<T> extends Node<T> {
  children: [QuadTreeNode<T> | null, QuadTreeNode<T> | null, QuadTreeNode<T> | null, QuadTreeNode<T> | null];
}

/**
 * @memoryLayout Pointer
 * @topology Spatial_Grid (2D)
 */
export interface QuadTree<T> extends DataStructure<T> {
  root: QuadTreeNode<T> | null;
  bounds: { x: number; y: number; width: number; height: number };
}

export interface OctreeNode<T> extends Node<T> {
  children: [
      OctreeNode<T> | null, OctreeNode<T> | null, OctreeNode<T> | null, OctreeNode<T> | null,
      OctreeNode<T> | null, OctreeNode<T> | null, OctreeNode<T> | null, OctreeNode<T> | null
  ];
}

/**
 * @memoryLayout Pointer
 * @topology Spatial_Grid (3D)
 */
export interface Octree<T> extends DataStructure<T> {
  root: OctreeNode<T> | null;
  bounds: { x: number; y: number; z: number; size: number };
}