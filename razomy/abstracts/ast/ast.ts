import type {WithDescription, WithName} from "../domains";
import type {WithKind} from "../domains";


export interface Declaration extends WithKind {
}

export interface Definition extends Declaration, WithDescription, WithName {
}

// a, 1, /** My magic number */4
export interface Literal extends Declaration {
  value: any;
}

/**
 * @example
 * ```ts
 * "string1"
 * ```
 * @example
 * ```ts
 * 'string2'
 * ```
 */
export interface StringLiteral extends Literal {
  kind: 'StringLiteral';
  value: string;
}

export interface String extends Declaration {
  kind: 'String';
}

/**
 * @example
 * ```ts
 * 42
 * ```
 * @example
 * ```ts
 * 3.14
 * ```
 */
export interface NumberLiteral extends Literal {
  kind: 'NumberLiteral';
  value: number;
}

export interface Number extends Declaration {
  kind: 'Number';
}

/**
 * @example
 * ```ts
 * true
 * ```
 * @example
 * ```ts
 * false
 * ```
 */
export interface BooleanLiteral extends Literal {
  kind: 'BooleanLiteral';
  value: boolean;
}

export interface Boolean extends Declaration {
  kind: 'Boolean';
}

/**
 * @example
 * ```ts
 * string[]
 * ```
 * @example
 * ```ts
 * [1, 2, 3]
 * ```
 */
export interface Array extends Declaration {
  kind: 'Array';
  item: Any;
}

/**
 * @example
 * ```ts
 * [string, number]
 * ```
 * @example
 * ```ts
 * ['John', 25]
 * ```
 */
export interface Tuple extends Declaration {
  kind: 'Tuple';
  items: Any[];
}


/**
 * @example
 * ```ts
 * [1, 2, selected 3, 4, 5]
 * ```
 */
export interface Select extends Declaration {
  kind: 'Select';
  selected: number;
  items: Any;
}

/**
 * @example
 * ```ts
 * [1, 2, selected1 3, 4, selected2 5]
 * ```
 */
export interface MultiSelect extends Declaration {
  kind: 'MultiSelect';
  selected: number[];
  items: Any;
}

/**
 * @example
 * ```ts
 * const myVar = "hello";
 * ```
 * @example
 * ```ts
 * let count: number;
 * ```
 */
export interface Variable extends Declaration {
  kind: 'Variable';
  key: string;
  item: Any;
  value: Literal | null;
}

/**
 * @example
 * ```ts
 * myProperty: string = "text"
 * ```
 * @example
 * ```ts
 * age: number
 * ```
 */
export interface Property extends Definition {
  kind: 'Property';
  item: Any;
  value: Literal | null;
}

/**
 * @example
 * ```ts
 * UserType // Referencing an existing type or variable
 * ```
 * @example
 * ```ts
 * domain.UserType // Referencing an existing type or variable
 * ```
 */
export interface Reference extends Declaration {
  kind: 'Reference';
  key: string;
}

/**
 * @example
 * ```ts
 * { name: string; age: number; }
 * ```
 * @example
 * ```ts
 * { id: 1 }
 * ```
 */
export interface Object extends Declaration {
  kind: 'Object';
  items: Property[];
}

/**
 * @example
 * ```ts
 * string | number
 * ```
 * @example
 * ```ts
 * 'success' | 'error'
 * ```
 */
export interface Union extends Declaration {
  kind: 'Union';
  item: Any[];
}

/**
 * @example
 * ```ts
 * User & Timestamped
 * ```
 * @example
 * ```ts
 * { id: string } & { name: string }
 * ```
 */
export interface Intersection extends Declaration {
  kind: 'Intersection';
  item: Any[];
}

/**
 * @example
 * ```ts
 * type MyCustomType = string | number;
 * ```
 */
export interface Type extends Declaration {
  kind: 'Type';
  key: string;
  value: Any;
}

/**
 * @example
 * ```ts
 * Promise<string>
 * ```
 * @example
 * ```ts
 * Record<string, number>
 * ```
 */
export interface Generic extends Declaration {
  kind: 'Generic';
  base: Any;
  items: Any[];
}

/**
 * @example
 * ```ts
 * void
 * ```
 */
export interface Void extends Declaration {
  kind: 'Void';
}

/**
 * @example
 * ```ts
 * function calculateTotal {price: number, tax: number}: number { ... }
 * function calculateTotal [number, number]: number { ... } // 1,2
 * function calculateTotal number: number { ... } // 1
 * function calculateTotal(a:number, b:c, d:3, ...args): number { ... } // {a,b,d,0,1,2,3,4,5}
 * function calculateTotal : number { ... }
 * function calculateTotal : {} { ... }
 * function calculateTotal : [] { ... }
 * ```
 */
export interface Function extends Definition {
  kind: 'Function';
  parameter: Any;
  return_: Any;
}

/**
 * /package/function.ts
 * @example
 * ```ts
 * /**
 * * @example
 * * calculateTotal(); // => 1
 * *\/
 * @performance('O(n)')
 * function calculateTotal(price: number, tax: number): number { ... }
 * ```
 */
export interface PackageFunction extends Definition {
  kind: 'PackageFunction';
  name: string;
  title: string;
  parameter: Any;
  return_: Any;
  // other
  functionPath: string[];
  performance: {
    timeDataSizeComplexityFn: string;
    memoryDataSizeComplexityFn: string;
    history: []
    // history: performance.PerformanceRecord[];
  };
  examples: {
    code: string;
    expected: string;
  }[];
}

/**
 * @example
 * ```ts
 * myFunction("john", 42, true) // The arguments passed into greet("john", 42, true)
 * ```
 */
export interface FunctionArgument extends Declaration {
  name: string;
  kind: 'FunctionArgument';
  arguments_: Literal[];
}

/**
 * @example
 * ```ts
 * "#FF0000"
 * ```
 * @example
 * ```ts
 * "rgba(255, 255, 255, 0.5)"
 * ```
 */
export interface Color extends Declaration {
  kind: 'Color';
}

/**
 * @example
 * ```ts
 * new Date()
 * ```
 * @example
 * ```ts
 * "2023-10-25T12:00:00Z"
 * ```
 */
export interface Date extends Declaration {
  kind: 'Date';
}

/**
 * @example
 * ```ts
 * new File(["content"], "test.txt", { type: "text/plain" })
 * ```
 */
export interface File extends Declaration {
  kind: 'File';
}

/**
 * @example
 * ```ts
 * [file1, file2] // e.g., FileList from <input type="file" multiple />
 * ```
 */
export interface FileArray extends Declaration {
  kind: 'FileArray';
}

/**
 * @example
 * ```ts
 * '{"name": "John", "age": 30}'
 * ```
 */
export interface JsonString extends Declaration {
  kind: 'JsonString';
}

export interface Module extends Declaration {
  kind: 'Module';
  items: Any[];
}

export interface Unknown extends Declaration {
  kind: 'Unknown';
  tsSyntaxKey: string;
}

export type Any = String
  | StringLiteral
  | Number
  | NumberLiteral
  | Boolean
  | BooleanLiteral
  | Array
  | Tuple
  | Select
  | MultiSelect
  | Property
  | Object
  | Generic
  | Type
  | Union
  | Intersection
  | File
  | Color
  | Date
  | Variable
  | Module
  | FileArray
  | JsonString
  | Function
  | FunctionArgument
  | PackageFunction
  | Void
  | Reference
  | Unknown
  ;
