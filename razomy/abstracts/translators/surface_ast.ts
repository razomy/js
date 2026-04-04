/**
 * Суть: Описывает Cинтаксис (то, как написан код).
 * Правила: Оборачивает CST → Дает узлам языковой смысл → Игнорирует пробелы → Все имена — это просто строки.
 * Код разделен на два параллельных пространства (от внешних абстракций к внутренним):
 * 1. Пространство значений - сущетвуют в копилированом коде
 * - Expression — внешние единицы измерения (базовые вычисляемые блоки, data, structure in memory, return value).
 * - Statement — список действий и завершенных шаблонов над Expression и Binding (logic, action, no return value).
 * - Binding — Declaration + Statement (связывание объявленного имени с конкретным действием/результатом).
 * 2. Пространство типов - сущетвуют в только на этапе разработки сахар
 * - Type — группирование Expression по общему признаку.
 * - TypeStatement — действия над группами типов (ограничения, маппинг, трансформации).
 * - TypeBinding — TypeDeclaration + TypeStatement (связывание имени типа с его правилами и структурой).
 */

/**
 * The foundational interface for all AST nodes.
 * @abstract
 */
export interface AstNode {
  /**
   * @abstract
   */
  kind: string;
}

// region Data Level 1
/**
 * Base interface for all expressions (data values).
 * Exists in memory
 * @example
 * ```ts
 * * Literal | [Literal]
 * 1, "hello", myFunc(), [1, 2, 3], 1+1
 * ```
 * @abstract
 */
export interface Expression extends AstNode {
}

/**
 * Base interface for all statements (actions/control flow).
 * Sequence of logic
 * @example
 * ```ts
 * * block of Template
 * a = 1;
 * `if (x) { ... }`, `for (let i = 0; i < 10; i++) { ... }`
 * ```
 * @abstract
 */
export interface Statement extends AstNode {
}

/**
 * @final
 */
export interface Identifier extends AstNode {
  kind: 'Identifier';
  name: string;
}

/**
 * Base interface for all declarations.
 * Represents creating an entity with a specific name and state.
 * Requqest memory
 * @example
 * ```ts
 * * Identifier with Expression assignment
 * `const x:number` or `interface User {}`
 * ```
 * @abstract
 */
export interface Binding extends AstNode {
}

/**
 * @abstract
 */
export type AstDataType = Expression | Statement | Binding;

// region Expression

/**
 * Represents a string literal expression.
 * @example
 * ```ts
 * "hello world"
 * ```
 * @final
 */
export interface StringExpression extends Expression {
  kind: 'StringExpression';
  value: string;
}

/**
 * Represents a number literal expression.
 * @example
 * ```ts
 * 42 or 3.14
 * ```
 * @final
 */
export interface NumberExpression extends Expression {
  kind: 'NumberExpression';
  value: number;
}

/**
 * Represents a boolean literal expression.
 * @example
 * ```ts
 * true or false
 * ```
 * @final
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
 * @final
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
 * @final
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
 * @final
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
 * @final
 */
export interface RegExpExpression extends Expression {
  kind: 'RegExpExpression';
  pattern: string;
  flags: string;
}

/**
 * Represents a template string expression.
 * @example
 * ```ts
 * `Hello ${name}`
 * ```
 * @final
 */
export interface TemplateExpression extends Expression {
  kind: 'TemplateExpression';
  template: string;
  expressions: ExpressionType[];
}

/**
 * Represents an array literal containing various expressions.
 * @example
 * ```ts
 * [1, 2, "text"]
 * ```
 * @final
 */
export interface ArrayExpression<T extends ExpressionType = ExpressionType> extends Expression {
  kind: 'ArrayExpression';
  expressions: T[];
}

/**
 * Represents a tuple expression.
 * (Syntactically similar to ArrayExpression in JS/TS, but conceptually fixed-length).
 * @example
 * ```ts
 * ['John', 25]
 * ```
 * @final
 */
export interface TupleExpression extends Expression {
  kind: 'TupleExpression';
  expressions: ExpressionType[];
}

/**
 * Represents a property inside an object literal expression.
 * @example
 * ```ts
 * name: "John" inside { name: "John" }
 * ```
 * @final
 */
export interface PropertyExpression extends Expression {
  kind: 'PropertyExpression';
  identifier: Identifier;
  expression: ExpressionType;
}

/**
 * Represents an object literal expression.
 * Contains functions
 * @example
 * ```ts
 * { name: "John", age: 30 }
 * ```
 * @final
 */
export interface ObjectExpression extends Expression {
  kind: 'ObjectExpression';
  expressions: PropertyExpression[];
}

/**
 * Represents a reference to an identifier (variable/function/etc).
 * @example
 * ```ts
 * myVariable when used in console.log(myVariable)
 * ```
 * @final
 */
export interface ReferenceExpression extends Expression {
  kind: 'ReferenceExpression';
  identifier: Identifier;
}

/** !1 ++1
 * @final
 */
export interface UnaryExpression extends Expression {
  kind: 'UnaryExpression';
  operator: string;
  expression: ExpressionType;
  isPrefix: boolean;
}

/** 1+1 3&4
 * @final
 */
export interface BinaryExpression extends Expression {
  kind: 'BinaryExpression';
  operator: string;
  left: ExpressionType;
  right: ExpressionType;
}

/**
 * Represents an if statement.
 * @final
 */
export interface IfExpression extends Expression {
  kind: 'IfExpression';
  condition: ExpressionType;
  consequent: ExpressionType;
  alternate: ExpressionType | null;
}

/**
 * a = b?
 * 1-> 5
 * 2-> 6
 * @final
 */
export interface MatchExpression extends Expression {
  kind: 'MatchExpression';
  target: ExpressionType;
  cases: Array<{ pattern: ExpressionType; body: ExpressionType }>;
}

/**
 * Domain Specific Type: Represents an array/list where exactly one item is marked as selected.
 * @example
 * ```ts
 * Not native to TS. Conceptually: [1, 2, selected(3), 4]
 * ```
 * @final
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
 * Not native to TS. Conceptually: [1, selected 2, 3, selected 4]
 * ```
 * @final
 */
export interface MultiSelectExpression extends Expression {
  kind: 'MultiSelectExpression';
  expressions: ExpressionType[];
  selectedIndexes: number[];
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
  | ObjectExpression
  | PropertyExpression
  | TupleExpression
  | TemplateExpression
  | ReferenceExpression
  | MatchExpression
  | IfExpression
  | UnaryExpression
  | BinaryExpression
  | SelectExpression
  | MultiSelectExpression
  ;

// endregion Expression
// region Statement

/**
 * Represents a block of scoped statements.
 * {...;}
 * @final
 */
export interface BlockStatement extends Statement {
  kind: 'BlockStatement';
  statements: AstLeafType[];
}

/**
 * Represents a return statement.
 * return ...;
 * @final
 */
export interface ReturnStatement extends Statement {
  kind: 'ReturnStatement';
  description: string;
  argument: ExpressionType | null;
}

/**
 * Represents an if statement.
 * @final
 */
export interface IfStatement extends Statement {
  kind: 'IfStatement';
  condition: ExpressionType;
  consequent: StatementType;
  alternate: StatementType | null;
}

/**
 * Represents a while statement.
 * @final
 */
export interface WhileStatement extends Statement {
  kind: 'WhileStatement';
  condition: ExpressionType;
  body: StatementType;
}

/**
 * Represents a for statement.
 * @final
 */
export interface ForStatement extends Statement {
  kind: 'ForStatement';
  init: VariableStatement | null;
  check: ExpressionType | null;
  update: ExpressionType | null;
  body: StatementType;
}

/**
 * Represents a for-of or for-in statement.
 * @final
 */
export interface ForOfStatement extends Statement {
  kind: 'ForOfStatement';
  left: VariableStatement | ExpressionType;
  right: ExpressionType;
  body: StatementType;
  isAwait: boolean;
}

/**
 * Represents a break statement.
 * @final
 */
export interface BreakStatement extends Statement {
  kind: 'BreakStatement';
  label: Identifier | null;
}

/**
 * Represents a continue statement.
 * @final
 */
export interface ContinueStatement extends Statement {
  kind: 'ContinueStatement';
  label: Identifier | null;
}

/**
 * Represents a throw statement.
 * @final
 */
export interface ThrowStatement extends Statement {
  kind: 'ThrowStatement';
  argument: ExpressionType;
}

/**
 * @final
 */
export interface CatchStatement extends Statement {
  kind: 'CatchStatement';
  param: Identifier | null;
  body: StatementType;
}

/**
 * Represents a try-catch statement.
 * @final
 */
export interface TryStatement extends Statement {
  kind: 'TryStatement';
  block: BlockStatement
  handler: CatchStatement | null;
  finalizer: BlockStatement | null;
}

/**
 * switch
 * case1:do()
 * @final
 */
export interface MatchStatement extends Statement {
  kind: 'MatchStatement';
  target: ExpressionType;
  cases: Array<{ pattern: ExpressionType; body: BlockStatement }>;
}

/**
 * Represents a variable declaration.
 * @example
 * ```ts
 * let myVar: string;
 * ```
 * @final
 */
export interface VariableStatement extends Statement {
  kind: 'VariableStatement';
  identifier: Identifier;
  typeIdentifier: TypeIdentifier | null;
  description: string;
}


export type StatementType =
  | BlockStatement
  | VariableStatement
  | ReturnStatement
  | IfStatement
  | WhileStatement
  | CatchStatement
  | ForStatement
  | ForOfStatement
  | BreakStatement
  | ContinueStatement
  | MatchStatement
  | ThrowStatement
  | TryStatement;

// endregion Statement
// region Binding

/**
 * Represents a variable declaration.
 * @example
 * ```ts
 * const myVar: string = "hello";
 * ```
 * @final
 */
export interface VariableBinding extends Binding {
  kind: 'VariableBinding';
  identifier: Identifier;
  typeIdentifier: TypeIdentifier;
  isConst: boolean;
  description: string;
  expression: ExpressionType;
}

/** name(1,2)
 * @final
 */
export interface CallBinding extends Binding {
  kind: 'CallBinding';
  identifier: Identifier;
  arguments_: ExpressionType[];
}

/**
 * Represents an expression used as a statement.
 * a = ... ;
 * @final
 */
export interface AssignBinding extends Binding {
  kind: 'AssignBinding';
  identifier: Identifier;
  expression: ExpressionType;
}

/**
 * Represents an external dependency declaration.
 * @example
 * ```ts
 * import * as abstracts from "@razomy/abstracts";
 * ```
 * @final
 */
export interface DependencyBinding extends Binding {
  kind: 'DependencyBinding';
  identifier: Identifier;
  version: string;
  path: string;
}

/**
 * Represents a property defined inside a class, interface, or object.
 * @example
 * ```ts
 * readonly id?: string  = "1";
 * ```
 * @final
 */
export interface PropertyBinding extends Binding {
  kind: 'PropertyBinding';
  identifier: Identifier;
  typeIdentifier: TypeIdentifier | null;
  expression: ExpressionType | null;
  isOptional: boolean;
  description: string;
  isReadonly: boolean;
}

/**
 * Represents a parameter in a function declaration or signature.
 * @example
 * ```ts
 * (cat=args: string[])
 * ```
 * @final
 */
export interface ParameterBinding extends Binding {
  kind: 'ParameterBinding';
  identifier: Identifier;
  typeIdentifier: TypeIdentifier | null;
  description: string;
  expression: ExpressionType | null;
  isRest: boolean;
}

/**
 * Represents an individual member of an enum.
 * @example
 * ```ts
 * Up = 1 inside enum Direction { Up = 1 }
 * ```
 * @final
 */
export interface EnumPropertyBinding extends Binding {
  kind: 'EnumPropertyBinding';
  identifier: Identifier;
  description: string;
  expression: ExpressionType | null;
}

/**
 * Represents an enum declaration.
 * @example
 * ```ts
 * enum Direction { Up = 1, Down }
 * ```
 * @final
 */
export interface EnumBinding extends Binding {
  kind: 'EnumBinding';
  identifier: Identifier;
  description: string;
  properties: EnumPropertyBinding[];
}

/**
 * Represents a function declaration.
 * @example
 * ```ts
 * function calculateTotal(price: number): number { ... }
 * ```
 * @final
 */
export interface FunctionBinding extends Binding {
  kind: 'FunctionBinding';
  identifier: Identifier;
  parameters: ParameterBinding[];
  types: TypeBindingType[];
  returnType: ReturnType | null;
  description: string;
  isAsync: boolean;
  isGenerator: boolean;
  body: StatementType | null;
  title: string;
  performance: {
    timeDataSizeComplexityFn: string; memoryDataSizeComplexityFn: string; history: any[];
  };
  examples: Array<{ code: string; expected: string }>;
}

/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * interface Admin extends User { role: string; }
 * ```
 * @final
 */
export interface ClassBinding extends Binding {
  kind: 'ClassBinding';
  description: string;
  identifier: Identifier;
  extends_: ReferenceType[];
  properties: PropertyType[];
}

/**
 * Represents a module or namespace declaration.
 * @example
 * ```ts
 * namespace MyModule { export const x = 1; }
 * ```
 * @final
 */
export interface ModuleBinding extends Binding {
  kind: 'ModuleBinding';
  description: string;
  identifier: Identifier;
  body: AstLeafType[];
}

/**
 * Represents a package definition (like package.json).
 * @example
 * ```ts
 * Represents a module with dependencies.
 * ```
 * @final
 */
export interface PackageBinding extends Binding {
  kind: 'PackageBinding';
  identifier: Identifier;
  description: string;
  version: string;
  engine: DependencyBinding;
  dependencies: DependencyBinding[];
  body: AstLeafType[];
}

export type BindingType =
  VariableBinding
  | CallBinding
  | AssignBinding
  | DependencyBinding
  | PropertyBinding
  | ParameterBinding
  | EnumPropertyBinding
  | EnumBinding
  | FunctionBinding
  | ModuleBinding
  | PackageBinding
  | ClassBinding
  ;

// endregion Binding
// endregion Data
// region Type - Level 2

/**
 * Base interface for all type nodes (rules/constraints).
 * Not exists in compiler
 * @example
 * ```ts
 * Literal1|Literal2|Literal3 : Type(Group(Same Rule))
 * string, number, { a: string }, MyType
 * ```
 * @abstract
 */
export interface Type extends AstNode {
}

/*
 * @final
 */
export interface TypeIdentifier extends AstNode {
  kind: 'TypeIdentifier';
  name: string;
}

/*
 * @abstract
 */
export interface TypeStatement extends AstNode {
}

/*
 * @abstract
 */
export interface TypeBinding extends AstNode {
}

export type AstTypeType = Type | TypeStatement | TypeBinding;

// region TypeType

/**
 * Built-in language primitives.
 * Includes standard types like string, number, etc.
 * @example
 * ```ts
 * string, number, boolean, any
 * ```
 * @final
 */
export interface KeywordType extends Type {
  kind: 'KeywordType';
  name: | 'String' | 'Number' | 'Object' | 'Boolean' | 'Null' | 'Undefined' | 'Symbol' | 'Any' | 'Never' | 'Unknown' | 'Bigint' | 'Void';
}

/**
 * : String
 */
export interface ReturnType extends Type {
  kind: 'ReturnType';
  typeIdentifier: TypeIdentifier;
  description: string;
}

/**
 * Literal string type.
 * @example
 * ```ts
 * "success"
 * ```
 * @final
 */
export interface StringType extends Type {
  kind: 'StringType';
  value: string;
}

/**
 * Literal number type.
 * @example
 * ```ts
 * 42
 * ```
 * @final
 */
export interface NumberType extends Type {
  kind: 'NumberType';
  value: number;
}

/**
 * Literal boolean type.
 * @example
 * ```ts
 * true
 * ```
 * @final
 */
export interface BooleanType extends Type {
  kind: 'BooleanType';
  value: boolean;
}

/**
 * Literal null type.
 * @example
 * ```ts
 * null
 * ```
 * @final
 */
export interface NullType extends Type {
  kind: 'NullType';
  value: null;
}

/**
 * Literal undefined type.
 * @example
 * ```ts
 * undefined
 * ```
 * @final
 */
export interface UndefinedType extends Type {
  kind: 'UndefinedType';
  value: undefined;
}

/**
 * Literal BigInt type.
 * @example
 * ```ts
 * 100n
 * ```
 * @final
 */
export interface BigIntType extends Type {
  kind: 'BigIntType';
  value: string;
}

/**
 * Literal RegExp type.
 * @example
 * ```ts
 * /abc/
 * ```
 * @final
 */
export interface RegExpType extends Type {
  kind: 'RegExpType';
  value: string;
}

/**
 * Represents a template literal type.
 * @example
 * ```ts
 * \\user_${number}\\
 * ```
 * @final
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
 * @final
 */
export interface MappedType extends Type {
  kind: 'MappedType';
  identifier: Identifier;
  constraint: TypeType;
  type: TypeType;
}

/**
 * Represents an array type.
 * @example
 * ```ts
 * string[]
 * ```
 * @final
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
 * @final
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
 * @final
 */
export interface PropertyType extends Type {
  kind: 'PropertyType';
  typeIdentifier: TypeIdentifier;
  type: TypeType;
  description: string;
}

/**
 * Represents an object literal type.
 * @example
 * ```ts
 * { name: string; age: number }
 * ```
 * @final
 */
export interface ObjectType extends Type {
  kind: 'ObjectType';
  properties: PropertyType[];
}

/**
 * A reference to an existing type, class, or interface.
 * @example
 * ```ts
 * UserType
 * ```
 * @final
 */
export interface ReferenceType extends Type {
  kind: 'ReferenceType';
  typeIdentifier: TypeIdentifier;
}

/**
 * A reference to a generic type with type arguments.
 * @example
 * ```ts
 * Promise<string>
 * ```
 * @final
 */
export interface GenericReferenceType extends Type {
  kind: 'GenericReferenceType';
  typeIdentifier: TypeIdentifier;
  types: TypeType[];
}


/**
 * Represents a union type.
 * @example
 * ```ts
 * string | number
 * ```
 * @final
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
 * @final
 */
export interface IntersectionType extends Type {
  kind: 'IntersectionType';
  types: TypeType[];
}

/**
 * Represents a function type signature.
 * @example
 * ```ts
 * (price: number) => number
 * ```
 * @final
 */
export interface FunctionType extends Type {
  kind: 'FunctionType';
  parameters: PropertyType[];
  returnType: ReturnType | null;
}

export type TypeType =
  | KeywordType
  | ReferenceType
  | ArrayType
  | TupleType
  | ObjectType
  | TemplateType
  | MappedType
  | GenericReferenceType
  | StringType
  | NumberType
  | BooleanType
  | NullType
  | UndefinedType
  | BigIntType
  | RegExpType
  | UnionType
  | IntersectionType
  | ReturnType
  | FunctionType
  ;


// endregion TypeType
// region TypeBinding

/**
 * Represents a type alias declaration.
 * @example
 * ```ts
 * type MyCustomType = string | number;
 * ```
 * @final
 */
export interface AliasTypeBinding extends TypeBinding {
  kind: 'AliasTypeBinding';
  description: string;
  typeIdentifier: TypeIdentifier;
  type: TypeType;
}

/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * interface Admin extends User { role: string; }
 * ```
 * @final
 */
export interface InterfaceTypeBinding extends TypeBinding {
  kind: 'InterfaceTypeBinding';
  description: string;
  typeIdentifier: TypeIdentifier;
  extends_: ReferenceType[];
  properties: PropertyType[];
}


export type TypeBindingType = InterfaceTypeBinding
  | AliasTypeBinding
  ;

// endregion TypeBinding
// endregion Type

export type AstLeafType = StatementType | BindingType | TypeBindingType;

export type AstType = AstDataType | AstTypeType;
