// ==========================================
// 1. BASE NODES
// ==========================================

/**
 * The foundational interface for all AST nodes.
 */
export interface AstNode {
  kind: string;
  // Future implementation for error coordinates: loc: { start: number, end: number }
}

/**
 * Base interface for all expressions.
 */
export interface Expression extends AstNode {
}

/**
 * Represents the name of a variable, function, or property.
 * @example
 * ```ts
 * myVar
 * ```
 */
export interface Identifier extends AstNode {
  kind: 'Identifier';
  name: string;
}

export interface TypeIdentifier extends AstNode {
  kind: 'TypeIdentifier';
  name: string;
}

/**
 * Base interface for all type nodes.
 */
export interface Type extends AstNode {
}

/**
 * Base interface for all declarations.
 */
export interface Declaration extends AstNode {
  identifier: Identifier;
  isPublic: boolean;
  description: string;
}

export type AstType = Expression | Identifier | TypeIdentifier | Type | Declaration;

// ==========================================
// 2. EXPRESSIONS
// Values computed during program execution
// ==========================================


/**
 * Represents a string literal expression.
 * @example
 * ```ts
 * "hello world"
 * ```
 */
export interface StringExpression extends Expression {
  kind: 'StringExpression';
  value: string;
}

/**
 * Represents a number literal expression.
 * @example
 * ```ts
 * 42
 * ```
 */
export interface NumberExpression extends Expression {
  kind: 'NumberExpression';
  value: number;
}

/**
 * Represents a boolean literal expression.
 * @example
 * ```ts
 * true
 * ```
 */
export interface BooleanExpression extends Expression {
  kind: 'BooleanExpression';
  value: boolean;
}

/**
 * Represents a null literal expression.
 * @example
 * ```ts
 * null
 * ```
 */
export interface NullExpression extends Expression {
  kind: 'NullExpression';
  value: null;
}

/**
 * Represents an undefined literal expression.
 * @example
 * ```ts
 * undefined
 * ```
 */
export interface UndefinedExpression extends Expression {
  kind: 'UndefinedExpression';
  value: undefined;
}

/**
 * Represents a BigInt literal expression.
 * @example
 * ```ts
 * 9007199254740991n
 * ```
 */
export interface BigIntExpression extends Expression {
  kind: 'BigIntExpression';
  value: bigint;
}

/**
 * Represents a Regular Expression literal.
 * @example
 * ```ts
 * /^[a-z]+$/i
 * ```
 */
export interface RegExpExpression extends Expression {
  kind: 'RegExpExpression';
  pattern: string;
  flags: string;
}

// ==========================================
//
// WithChildren
// ==========================================


/**
 * Represents an array literal containing various expressions.
 * @example
 * ```ts
 * [1, 2, "text"]
 * ```
 */
export interface ArrayExpression<T extends ExpressionType = ExpressionType> extends Expression {
  kind: 'ArrayExpression';
  expressions: T[];
}

// `sd ${as} ${1}`
export interface TemplateExpression extends Expression {
  kind: 'TemplateExpression';
  template: string;
  expressions: ExpressionType[];
}

/**
 * Represents a tuple expression.
 * (Syntactically similar to ArrayExpression in JS/TS, but separated for custom language needs).
 * @example
 * ```ts
 * ['John', 25]
 * ```
 */
export interface TupleExpression extends Expression {
  kind: 'TupleExpression';
  expressions: ExpressionType[];
}

/**
 * Domain Specific Type: Represents an array/list where exactly one item is marked as selected.
 * @example
 * ```ts
 * [1, 2, selected 3, 4]
 * ```
 */
export interface SelectExpression extends Expression {
  kind: 'SelectExpression';
  expressions: ExpressionType[];
  selectedIndex: number;
}

/**
 * Domain Specific Type: Represents an array/list where multiple items can be marked as selected.
 * @example
 * ```ts
 *[1, selected 2, 3, selected 4]
 * ```
 */
export interface MultiSelectExpression extends Expression {
  kind: 'MultiSelectExpression';
  expressions: ExpressionType[];
  selectedIndexes: number[];
}

export interface IdentifierExpression extends Expression {
  identifier: Identifier;
}

export type ExpressionType =
  | StringExpression
  | NumberExpression
  | BooleanExpression
  | NullExpression
  | UndefinedExpression
  | BigIntExpression
  | RegExpExpression
  | ArrayExpression
  | TupleExpression
  | SelectExpression
  | TemplateExpression
  | MultiSelectExpression
  | IdentifierExpression
  | DependencyExpression;


// ==========================================
// 3. TYPE NODES
// How types are written in the code (Type Annotations)
// ==========================================


/**
 * Built-in language primitives.
 * Includes Domain Specific types (color, date, file, jsonString) reserved as keywords.
 * @example
 * ```ts
 * string
 * ```
 */
export interface KeywordType extends Type {
  kind: 'KeywordType';
  name: | 'string' | 'number' | 'symbol' | 'object' | 'boolean' | 'null' | 'undefined' | 'any' | 'never' | 'unknown' | 'bigint' | 'void' | 'color' | 'date' | 'file' | 'fileArray' | 'jsonString';
}

export interface StringType extends Type {
  kind: 'StringType';
  value: string
}

export interface NumberType extends Type {
  kind: 'NumberType';
  value: number
}

export interface BooleanType extends Type {
  kind: 'BooleanType';
  value: boolean
}

export interface NullType extends Type {
  kind: 'NullType';
  value: null
}

export interface UndefinedType extends Type {
  kind: 'UndefinedType';
  value: undefined
}

export interface BigIntType extends Type {
  kind: 'BigIntType';
  value: string
}

export interface RegExpType extends Type {
  kind: 'RegExpType';
  value: string
}

/**
 * A reference to an existing type, class, or interface.
 * @example
 * ```ts
 * UserType
 * ```
 */
export interface ReferenceType extends Type {
  kind: 'ReferenceType';
  identifier: TypeIdentifier;
}

/**
 * A reference to a generic type with type arguments.
 * @example
 * ```ts
 * Promise<string, number>
 * ```
 */
export interface GenericReferenceType extends Type {
  kind: 'GenericReferenceType';
  identifier: TypeIdentifier;
  types: TypeType[];
}

/**
 * Represents an array type.
 * @example
 * ```ts
 * string[]
 * ```
 */
export interface ArrayType extends Type {
  kind: 'ArrayType';
  type: TypeType;
}

/**
 * Represents a tuple type.
 * @example
 * ```ts
 * [string, number]
 * ```
 */
export interface TupleType extends Type {
  kind: 'TupleType';
  types: TypeType[];
}

/**
 * Represents a property defined inside a type or interface.
 * @example
 * ```ts
 * readonly id: string;
 * ```
 */
export interface PropertyType extends Type {
  kind: 'PropertyType';
  identifier: Identifier;
  type: TypeType;
  description: string;
}

/**
 * Represents an object literal type.
 * @example
 * ```ts
 * { name: string; age: number }
 * ```
 */
export interface ObjectType extends Type {
  kind: 'ObjectType';
  properties: PropertyType[];
}

/**
 * Represents a union type.
 * @example
 * ```ts
 * string | number
 * ```
 */
export interface UnionType extends Type {
  kind: 'UnionType';
  types: TypeType[];
}

/**
 * Represents an intersection type.
 * @example
 * ```ts
 * User & Timestamped
 * ```
 */
export interface IntersectionType extends Type {
  kind: 'IntersectionType';
  types: TypeType[];
}

/**
 * Represents a template literal type.
 * @example
 * ```ts
 * `user_${number}`
 * ```
 */
export interface TemplateType extends Type {
  kind: 'TemplateType';
  template: string;
  types: TypeType[];
}

/**
 * Represents a mapped type.
 * @example
 * ```ts
 * { [K in keyof User]: boolean }
 * ```
 */
export interface MappedType extends Type {
  kind: 'MappedType';
  identifier: Identifier;
  constraint: TypeType;
  type: TypeType;
}

/**
 * Represents a function type signature.
 * @example
 * ```ts
 * (price: number, tax: number) => number
 * ```
 */
export interface FunctionType extends Type {
  kind: 'FunctionType';
  parameters: PropertyType[];
  return_: TypeType;
}

export type TypeType =
  | KeywordType
  | ReferenceType
  | ArrayType
  | TupleType
  | ObjectType
  | UnionType
  | IntersectionType
  | TemplateType
  | MappedType
  | FunctionType
  | GenericReferenceType
  | StringType
  | NumberType
  | BooleanType
  | NullType
  | UndefinedType
  | BigIntType
  | RegExpType
  ;

// ==========================================
// 4. DECLARATIONS
// Statements that create new entities in a scope
// ==========================================


/**
 * Represents a variable declaration.
 * @example
 * ```ts
 * var myVar;
 * const myVar: string = "hello";
 * ```
 */
export interface VariableDeclaration extends Declaration {
  kind: 'VariableDeclaration';
  isConst: boolean;
  type: TypeType | null;
  expression: ExpressionType | null;

}

/**
 * Represents a property defined inside a type or interface.
 * @example
 * ```ts
 * readonly id?: string;
 * ```
 */
export interface PropertyDeclaration extends Declaration {
  kind: 'PropertyDeclaration';
  type: TypeType | null;
  expression: ExpressionType | null;
  isOptional: boolean;
  isReadonly: boolean;

}

/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * interface Admin extends User { role: string; }
 * ```
 */
export interface InterfaceDeclaration extends Declaration {
  kind: 'InterfaceDeclaration';
  extends_: ReferenceType[];
  properties: PropertyDeclaration[];

}

/**
 * Represents a type alias declaration.
 * @example
 * ```ts
 * type MyCustomType = string | number;
 * ```
 */
export interface TypeAliasDeclaration extends Declaration {
  kind: 'TypeAliasDeclaration';
  type: TypeType;

}

/**
 * Represents an individual member of an enum.
 * @example
 * ```ts
 * Up = 1
 * ```
 */
export interface EnumPropertyDeclaration extends Declaration {
  kind: 'EnumPropertyDeclaration';
  expression: ExpressionType | null;

}

/**
 * Represents an enum declaration.
 * @example
 * ```ts
 * enum Direction { Up = 1, Down }
 * ```
 */
export interface EnumDeclaration extends Declaration {
  kind: 'EnumDeclaration';
  properties: EnumPropertyDeclaration[];

}

/**
 * Represents a parameter in a function declaration or signature.
 * @example
 * ```ts
 * ...args: string[]
 * ```
 */
export interface ParameterDeclaration extends Declaration {
  kind: 'ParameterDeclaration';
  type: TypeType | null;
  expression: ExpressionType | null;
  isRest: boolean;
}

export interface ReturnDeclaration extends Declaration {
  kind: 'ReturnDeclaration';
  type: TypeType | null;
  identifier: { name: 'return', kind: 'Identifier' };
}


/**
 * Represents a function declaration.
 * @example
 * ```ts
 * function calculateTotal(price: number): number { ... }
 * ```
 */
export interface FunctionDeclaration extends Declaration {
  kind: 'FunctionDeclaration';
  parameters: ParameterDeclaration[];
  return_: ReturnDeclaration;
  isAsync: boolean;
  isGenerator: boolean;
  body: DeclarationType[];
  // other
  title: string;
  // other
  performance: {
    timeDataSizeComplexityFn: string; memoryDataSizeComplexityFn: string; history: []
    // history: performance.PerformanceRecord[];
  };
  examples: {
    code: string; expected: string;
  }[];
}

// @razomy/something=1.0.0
export interface DependencyExpression extends Expression {
  kind: 'DependencyExpression';
  identifier: Identifier;
  version: string;
}

/**
 * Represents a module or namespace declaration.
 * @example
 * ```ts
 * file.ts [...]
 * index.ts [...export folder, export files]
 * ```
 */
export interface ModuleDeclaration extends Declaration {
  kind: 'ModuleDeclaration';
  body: DeclarationType[];
}

export interface PackageDeclaration extends Declaration {
  kind: 'PackageDeclaration';
  body: ModuleDeclaration;
  version: string;
  engine: DependencyExpression;
  dependencies: DependencyExpression[];
}


export type DeclarationType =
  | VariableDeclaration
  | InterfaceDeclaration
  | TypeAliasDeclaration
  | EnumDeclaration
  | FunctionDeclaration
  | ModuleDeclaration
  | PackageDeclaration;

// ----

export type AstLeafType = ExpressionType | TypeType | DeclarationType;
