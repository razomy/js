export type null_ = null;

export type bool = true | false;

export type i8 = number;
export type i16 = number;
export type i32 = number;
export type i64 = bigint;
export type i128 = bigint;
export type int = i32;

export type u8 = number;
export type u16 = number;
export type u32 = number;
export type u64 = bigint;
export type u128 = bigint;

export type f32 = number;
export type f64 = number;
export type float = f32;

export type char = string;
export type lineString = string;
export type myltilineString = string;

export type enumInt = number[];
export type enumString = string[];

export type OtherPrimitive = bool | null_;
export type IntPrimitive = i8 | i16 | i32 | i64 | i128 | int;
export type UIntPrimitive = u8 | u16 | u32 | u64 | u128;
export type FloatPrimitive = f32 | f64 | float;
export type NumberPrimitive = IntPrimitive | UIntPrimitive | FloatPrimitive | enumInt;
export type StringPrimitive = char | lineString | myltilineString | enumString;
export type AllPrimitive = NumberPrimitive | StringPrimitive | OtherPrimitive;

export type HardwareLimitation =
  | 'Read_ByIndex'
  | 'Search_ByValue'
  | 'InsertDelete'
  | 'MemoryFootprint'
  | 'CacheLocality';

---


export type OptimizationTradeoff = {
  read: BigO;
  search: BigO;
  insertDelete: BigO;
  memory: 'High' | 'Medium' | 'Low';
  cacheLocality: 'Excellent' | 'Poor' | 'Random';
};

// ==========================================
// LEVEL 1: MEMORY PHYSICS (RAM LAYOUT)
// ==========================================
export type PhysicalMemoryLayout =
  | 'Contiguous'
  | 'Pointer'
  | 'Hashed'
  | 'Composite';

// ==========================================
// LEVEL 2: TOPOLOGY (CONNECTION CARDINALITY)
// ==========================================
export type LogicalTopology =
  | '1:1_Linear'
  | '1:N_Hierarchical'
  | 'N:M_Network'
  | 'Spatial_Grid';

// ==========================================
// LEVEL 3: FUNDAMENTAL BASE TYPE
// ==========================================
export interface DataStructure<T> {
  rawValue: T;
  memoryLayout: PhysicalMemoryLayout;
  topology: LogicalTopology;
  tradeoff: OptimizationTradeoff;
}

// ==========================================
// LEVEL 4: FUNDAMENTAL STRUCTURES (THE CORE)
// ==========================================
export interface StaticArray<T> extends DataStructure<T> {
  memoryLayout: 'Contiguous';
  topology: '1:1_Linear';
  length: number;
}

export interface DynamicArray<T> extends DataStructure<T> {
  memoryLayout: 'Contiguous';
  topology: '1:1_Linear';
  capacity: number;
  length: number;
  resizeAlgorithm: () => void;
}

export interface LinkedList<T> extends DataStructure<T> {
  memoryLayout: 'Pointer';
  topology: '1:1_Linear';
  next: LinkedList<T> | null;
}

export interface DoublyLinkedList<T> extends LinkedList<T> {
  prev: DoublyLinkedList<T> | null;
}

export interface HashTable<K, V> extends DataStructure<V> {
  memoryLayout: 'Hashed';
  topology: '1:1_Linear';
  buckets: DynamicArray<LinkedList<V>>;
  hashFunction: (key: K) => number;
}

export interface Tree<T> extends DataStructure<T> {
  memoryLayout: 'Pointer' | 'Contiguous';
  topology: '1:N_Hierarchical';
  children: Tree<T>[];
}

export interface Graph<T> extends DataStructure<T> {
  memoryLayout: 'Composite';
  topology: 'N:M_Network';
  isDirected: boolean;
  isWeighted: boolean;
}

// ==========================================
// LEVEL 5: SPECIFIC OPTIMIZATION ALGORITHMS
// ==========================================
export interface BinaryTree<T> extends Tree<T> {
  children: [BinaryTree<T> | null, BinaryTree<T> | null];
}

export interface BalancedTree<T> extends BinaryTree<T> {
  type: 'AVL' | 'Red-Black';
  rebalanceAlgorithm: () => void;
}

export interface BTree<T> extends Tree<T> {
  memoryLayout: 'Contiguous';
  degree: number;
}

export interface Trie<T> extends Tree<T> {
  isEndOfWord: boolean;
}

export interface Heap<T> extends Tree<T> {
  memoryLayout: 'Contiguous';
  type: 'Min-Heap' | 'Max-Heap';
  heapifyAlgorithm: () => void;
}

export interface QuadTree<T> extends DataStructure<T> {
  topology: 'Spatial_Grid';
  children: [QuadTree<T> | null, QuadTree<T> | null, QuadTree<T> | null, QuadTree<T> | null];
  bounds: { x: number; y: number; width: number; height: number };
}

export interface GraphAdjacencyMatrix<T> extends Graph<T> {
  memoryLayout: 'Contiguous';
  matrix: number[][];
}

export interface GraphAdjacencyList<T> extends Graph<T> {
  memoryLayout: 'Pointer';
  adjacencyMap: HashTable<T, LinkedList<T>>;
}

// ==========================================
// LEVEL 6: ABSTRACT DATA TYPES (ADT)
// ==========================================
export interface AbstractDataType<T> {
  underlyingStructure: any;
}

export interface Stack<T> extends AbstractDataType<T> {
  underlyingStructure: DynamicArray<T> | LinkedList<T>;
  push: (item: T) => void;
  pop: () => T;
}

export interface Queue<T> extends AbstractDataType<T> {
  underlyingStructure: LinkedList<T> | DynamicArray<T>;
  enqueue: (item: T) => void;
  dequeue: () => T;
}

export interface Deque<T> extends AbstractDataType<T> {
  underlyingStructure: DoublyLinkedList<T> | DynamicArray<T>;
  pushFront: (item: T) => void;
  pushBack: (item: T) => void;
  popFront: () => T;
  popBack: () => T;
}

export interface PriorityQueue<T> extends AbstractDataType<T> {
  underlyingStructure: Heap<T>;
  enqueue: (item: T, priority: number) => void;
  dequeueHighestPriority: () => T;
}

export interface DictionaryMap<K, V> extends AbstractDataType<V> {
  underlyingStructure: HashTable<K, V> | BalancedTree<V>;
  set: (key: K, value: V) => void;
  get: (key: K) => V;
  has: (key: K) => boolean;
}

export interface Set<T> extends AbstractDataType<T> {
  underlyingStructure: HashTable<T, boolean> | BalancedTree<T>;
  add: (item: T) => void;
  has: (item: T) => boolean;
}