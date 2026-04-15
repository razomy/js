import * as abstracts from "@razomy/abstracts";

export interface QuadTreeNode<T> extends abstracts.structures.Node<T> {
  children: [QuadTreeNode<T> | null, QuadTreeNode<T> | null, QuadTreeNode<T> | null, QuadTreeNode<T> | null];
}

/**
 * @memoryLayout Pointer
 * @topology Spatial_Grid (2D)
 */
export interface QuadTree<T> extends abstracts.meta.DataStructure<T> {
  root: QuadTreeNode<T> | null;
  bounds: { x: number; y: number; width: number; height: number };
}

export interface OctreeNode<T> extends abstracts.structures.Node<T> {
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
export interface Octree<T> extends abstracts.meta.DataStructure<T> {
  root: OctreeNode<T> | null;
  bounds: { x: number; y: number; z: number; size: number };
}
