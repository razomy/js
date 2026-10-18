import * as abstractions from '@razomy/abstractions';

export interface QuadTreeNode<T> extends abstractions.structure.Node<T> {
  children: [QuadTreeNode<T> | null, QuadTreeNode<T> | null, QuadTreeNode<T> | null, QuadTreeNode<T> | null];
}

/**
 * @memoryLayout Pointer
 * @topology Spatial_Grid (2D)
 */
export interface QuadTree<T> extends abstractions.array.DataStructure<T> {
  root: QuadTreeNode<T> | null;
  bounds: { x: number; y: number; width: number; height: number };
}

export interface OctreeNode<T> extends abstractions.structure.Node<T> {
  children: [
    OctreeNode<T> | null,
    OctreeNode<T> | null,
    OctreeNode<T> | null,
    OctreeNode<T> | null,
    OctreeNode<T> | null,
    OctreeNode<T> | null,
    OctreeNode<T> | null,
    OctreeNode<T> | null,
  ];
}

/**
 * @memoryLayout Pointer
 * @topology Spatial_Grid (3D)
 */
export interface Octree<T> extends abstractions.array.DataStructure<T> {
  root: OctreeNode<T> | null;
  bounds: { x: number; y: number; z: number; size: number };
}
