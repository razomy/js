export interface ProbabilisticDataStructure<_T> {
  accuracy: number;
}

/**
 * @memoryLayout Contiguous (Bit Array)
 * @topology 1:1_Linear
 */
export interface BloomFilter<T> extends ProbabilisticDataStructure<T> {
  underlyingStructure: Uint8Array;
  hashFunctions: Array<(item: T) => number>;
  add: (item: T) => void;
  mightContain: (item: T) => boolean;
}

/**
 * @memoryLayout Contiguous (Registers)
 * @topology 1:1_Linear
 */
export interface HyperLogLog<T> extends ProbabilisticDataStructure<T> {
  underlyingStructure: Uint8Array;
  add: (item: T) => void;
  countEstimate: () => number;
}
