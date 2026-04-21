import * as abstracts from '@razomy/abstracts';
import type {RawBuffer} from "./buffer";


/**
 * @memoryLayout Contiguous
 * @topology 1:1_Linear
 */
export interface TypedMemoryView<T> extends abstracts.meta.DataStructure<T> {
  buffer: RawBuffer;
  byteLength: number;
  byteOffset: number;
}

export type U8Array = Uint8Array;
export type F64Array = Float64Array;

export type SequenceArray<V> = V[];
export type Tuple<T extends unknown[]> = T;

/**
 * @memoryLayout Contiguous
 * @topology 1:1_Linear
 */
export interface StaticArray<T> extends abstracts.meta.DataStructure<T> {
  readonly length: number;

  [index: number]: T;
}

/**
 * @memoryLayout Contiguous
 * @topology 1:1_Linear
 */
export interface DynamicArray<T> extends abstracts.meta.DataStructure<T> {
  capacity: number;
  length: number;
  resizeAlgorithm: () => void;

  [index: number]: T;
}

