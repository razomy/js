// build tree and resolve dependencies
// engine for text

/**
 * The foundational interface for all AST nodes.
 */
export interface AstNode {
  kind: string;
}

/**
 * Base interface for all expressions (data values).
 * @example
 * ```ts
 * \`1\`, \`"hello"\`, \`myFunc()\`, \`[1, 2, 3]\`
 * ```
 */
export interface Expression extends AstNode {
}

/**
 * Base interface for all type nodes (rules/constraints).
 * @example
 * ```ts
 * \`string\`, \`number\`, \`{ a: string }\`, \`MyType\`
 * ```
 */
export interface Type extends AstNode {
}

/**
 * Represents the name of a variable, function, or property.
 * @example
 * ```ts
 * \`myVar\`
 * ```
 */
export interface Identifier extends AstNode {
  kind: 'Identifier';
  name: string;
}

/**
 * Represents the name of a type, class, or interface.
 * @example
 * ```ts
 * \`UserType\`
 * ```
 */
export interface TypeIdentifier extends AstNode {
  kind: 'TypeIdentifier';
  name: string;
}

/**
 * Base interface for all declarations.
 * Represents creating an entity with a specific name and state.
 * @example
 * ```ts
 * \`const x = 1;\` or \`interface User {}\`
 * ```
 */
export interface Declaration extends AstNode {
  identifier: Identifier | TypeIdentifier;
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
 * \`"hello world"\`
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
 * \`42\` or \`3.14\`
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
 * \`true\` or \`false\`
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
 * \`null\`
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
 * \`undefined\`
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
 * \`9007199254740991n\`
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
 * \`/^[a-z]+$/i\`
 * ```
 */
export interface RegExpExpression extends Expression {
  kind: 'RegExpExpression';
  pattern: string;
  flags: string;
}

/**
 * Represents an array literal containing various expressions.
 * @example
 * ```ts
 * \`[1, 2, "text"]\`
 * ```
 */
export interface ArrayExpression<T extends ExpressionType = ExpressionType> extends Expression {
  kind: 'ArrayExpression';
  expressions: T[];
}

/**
 * Represents an object literal expression.
 * @example
 * ```ts
 * \`{ name: "John", age: 30 }\`
 * ```
 */
export interface ObjectExpression extends Expression {
  kind: 'ObjectExpression';
  properties: ObjectPropertyExpression[];
}

/**
 * Represents a property inside an object literal expression.
 * @example
 * ```ts
 * \`name: "John"\` inside \`{ name: "John" }\`
 * ```
 */
export interface ObjectPropertyExpression extends Expression {
  kind: 'ObjectPropertyExpression';
  key: Identifier | StringExpression;
  value: ExpressionType;
}

/**
 * Represents a template string expression.
 * @example
 * ```ts
 * \`\\\`Hello ${name}\\\`\`
 * ```
 */
export interface TemplateExpression extends Expression {
  kind: 'TemplateExpression';
  template: string;
  expressions: ExpressionType[];
}

/**
 * Represents a tuple expression.
 * (Syntactically similar to ArrayExpression in JS/TS, but conceptually fixed-length).
 * @example
 * ```ts
 * \`['John', 25]\`
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
 * Not native to TS. Conceptually: \`[1, 2, selected(3), 4]\`
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
 * Not native to TS. Conceptually: \`[1, selected(2), 3, selected(4)]\`
 * ```
 */
export interface MultiSelectExpression extends Expression {
  kind: 'MultiSelectExpression';
  expressions: ExpressionType[];
  selectedIndexes: number[];
}

/**
 * Represents a reference to an identifier (variable/function/etc).
 * @example
 * ```ts
 * \`myVariable\` when used in \`console.log(myVariable)\`
 * ```
 */
export interface ReferenceExpression extends Expression {
  kind: 'ReferenceExpression';
  identifier: Identifier;
}

/**
 * Represents an external dependency declaration.
 * @example
 * ```ts
 * import something from "@razomy/something@1.0.0"
 * ```
 */
export interface DependencyExpression extends Expression {
  kind: 'DependencyExpression';
  identifier: Identifier;
  version: string;
}

export interface CallExpression extends Expression {
  kind: 'CallExpression';
  callee: ExpressionType;
  args: ExpressionType[];
}

export interface MemberAccessExpression extends Expression {
  kind: 'MemberAccessExpression';
  target: ExpressionType;
  property: Identifier | ExpressionType;
  isComputed: boolean;
}

export interface MatchExpression extends Expression {
  kind: 'MatchExpression';
  target: ExpressionType;
  cases: Array<{ pattern: ExpressionType; body: BlockExpression }>;
}

export interface BlockExpression extends Expression {
  kind: 'BlockExpression';
  statements: Array<DeclarationType | ExpressionType>;
  returnExpression: ExpressionType | null;
}

export interface BinaryExpression extends Expression {
  kind: 'BinaryExpression';
  operator: string;
  left: ExpressionType;
  right: ExpressionType;
}

export interface UnaryExpression extends Expression {
  kind: 'UnaryExpression';
  operator: string;
  argument: ExpressionType;
  isPrefix: boolean;
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
  | ObjectPropertyExpression
  | TupleExpression
  | SelectExpression
  | TemplateExpression
  | MultiSelectExpression
  | ReferenceExpression
  | DependencyExpression
  | CallExpression
  | MemberAccessExpression
  | MatchExpression
  | BlockExpression
  | BinaryExpression
  | UnaryExpression;

// ==========================================
// 3. TYPE NODES
// How types are written in the code (Type Annotations)
// ==========================================

/**
 * Built-in language primitives.
 * Includes standard types like string, number, etc.
 * @example
 * ```ts
 * \`string\`, \`number\`, \`boolean\`, \`any\`
 * ```
 */
export interface KeywordType extends Type {
  kind: 'KeywordType';
  name:
    | 'string' | 'number' | 'object' | 'boolean' | 'null' | 'undefined' | 'symbol'
    | 'any' | 'never' | 'unknown' | 'bigint' | 'void';
}

/**
 * Literal string type.
 * @example
 * ```ts
 * \`"success"\`
 * ```
 */
export interface StringType extends Type {
  kind: 'StringType';
  value: string;
}

/**
 * Literal number type.
 * @example
 * ```ts
 * \`42\`
 * ```
 */
export interface NumberType extends Type {
  kind: 'NumberType';
  value: number;
}

/**
 * Literal boolean type.
 * @example
 * ```ts
 * \`true\`
 * ```
 */
export interface BooleanType extends Type {
  kind: 'BooleanType';
  value: boolean;
}

/**
 * Literal null type.
 * @example
 * ```ts
 * \`null\`
 * ```
 */
export interface NullType extends Type {
  kind: 'NullType';
  value: null;
}

/**
 * Literal undefined type.
 * @example
 * ```ts
 * \`undefined\`
 * ```
 */
export interface UndefinedType extends Type {
  kind: 'UndefinedType';
  value: undefined;
}

/**
 * Literal BigInt type.
 * @example
 * ```ts
 * \`100n\`
 * ```
 */
export interface BigIntType extends Type {
  kind: 'BigIntType';
  value: string;
}

/**
 * Literal RegExp type.
 * @example
 * ```ts
 * \`/abc/\`
 * ```
 */
export interface RegExpType extends Type {
  kind: 'RegExpType';
  value: string;
}

/**
 * A reference to an existing type, class, or interface.
 * @example
 * ```ts
 * \`UserType\`
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
 * \`Promise<string>\`
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
 * \`string[]\`
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
 * \`[string, number]\`
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
 * \`readonly id: string;\`
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
 * \`{ name: string; age: number }\`
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
 * \`string | number\`
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
 * \`User & Timestamped\`
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
 * \`\\\`user_${number}\\\`\`
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
 * \`{ [K in keyof User]: boolean }\`
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
 * \`(price: number) => number\`
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
  | RegExpType;

// ==========================================
// 4. DECLARATIONS
// Statements that create new entities in a scope
// ==========================================

/**
 * Represents a variable declaration.
 * @example
 * ```ts
 * \`const myVar: string = "hello";\`
 * ```
 */
export interface VariableDeclaration extends Declaration {
  kind: 'VariableDeclaration';
  identifier: Identifier;
  isConst: boolean;
  type: TypeType | null;
  expression: ExpressionType | null;
}

/**
 * Represents a property defined inside a class, interface, or object.
 * @example
 * ```ts
 * \`readonly id?: string;\`
 * ```
 */
export interface PropertyDeclaration extends Declaration {
  kind: 'PropertyDeclaration';
  identifier: Identifier;
  type: TypeType | null;
  expression: ExpressionType | null;
  isOptional: boolean;
  isReadonly: boolean;
}

/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * \`interface Admin extends User { role: string; }\`
 * ```
 */
export interface InterfaceDeclaration extends Declaration {
  kind: 'InterfaceDeclaration';
  identifier: TypeIdentifier;
  extends_: ReferenceType[];
  properties: PropertyDeclaration[];
}

/**
 * Represents a type alias declaration.
 * @example
 * ```ts
 * \`type MyCustomType = string | number;\`
 * ```
 */
export interface TypeAliasDeclaration extends Declaration {
  kind: 'TypeAliasDeclaration';
  identifier: TypeIdentifier;
  type: TypeType;
}

/**
 * Represents an individual member of an enum.
 * @example
 * ```ts
 * \`Up = 1\` inside \`enum Direction { Up = 1 }\`
 * ```
 */
export interface EnumPropertyDeclaration extends Declaration {
  kind: 'EnumPropertyDeclaration';
  identifier: Identifier;
  expression: ExpressionType | null;
}

/**
 * Represents an enum declaration.
 * @example
 * ```ts
 * \`enum Direction { Up = 1, Down }\`
 * ```
 */
export interface EnumDeclaration extends Declaration {
  kind: 'EnumDeclaration';
  identifier: TypeIdentifier;
  properties: EnumPropertyDeclaration[];
}

/**
 * Represents a parameter in a function declaration or signature.
 * @example
 * ```ts
 * \`...args: string[]\`
 * ```
 */
export interface ParameterDeclaration extends Declaration {
  kind: 'ParameterDeclaration';
  identifier: Identifier;
  type: TypeType | null;
  expression: ExpressionType | null;
  isRest: boolean;
}

/**
 * Represents a return declaration in a function.
 * @example
 * ```ts
 * \`return 42;\` or the return type of a function.
 * ```
 */
export interface ReturnDeclaration extends Declaration {
  kind: 'ReturnDeclaration';
  identifier: Identifier;
  type: TypeType | null;
}

/**
 * Represents a function declaration.
 * @example
 * ```ts
 * \`function calculateTotal(price: number): number { ... }\`
 * ```
 */
export interface FunctionDeclaration extends Declaration {
  kind: 'FunctionDeclaration';
  identifier: Identifier;
  parameters: ParameterDeclaration[];
  return_: ReturnDeclaration;
  isAsync: boolean;
  isGenerator: boolean;
  body: DeclarationType[];
  title: string;
  performance: {
    timeDataSizeComplexityFn: string;
    memoryDataSizeComplexityFn: string;
    history: any[];
  };
  examples: Array<{ code: string; expected: string }>;
}

/**
 * Represents a module or namespace declaration.
 * @example
 * ```ts
 * \`namespace MyModule { export const x = 1; }\`
 * ```
 */
export interface ModuleDeclaration extends Declaration {
  kind: 'ModuleDeclaration';
  identifier: Identifier;
  body: DeclarationType[];
}

/**
 * Represents a package definition (like package.json).
 * @example
 * ```ts
 * Represents a module with dependencies.
 * ```
 */
export interface PackageDeclaration extends Declaration {
  kind: 'PackageDeclaration';
  identifier: Identifier;
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
