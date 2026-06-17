/**
 * @description
 * вопрос по конкретики
 *  все интерфейсы это уникальные переключатели логики
 *  в самом интерфейсе это вариации одного и того же
 * time:
 * 1 - State
 * 2 - Operation
 * 3 - Logic
 * 4 - Declaration
 * 5 - Access
 * 6 - Panic
 *
 * @checklist
 * [] kind same as name
 * [] proper type mapping - value: SstType no @abstract
 * [] no null usage
 * [] strict layer no intersections
 * [] property same as Type Base - identifier:Identifier, shapes: Shapes ...
 *   uniq name or opposite names pairs or integration names in one scope - animal, cat | dog, cat1|cat2|cat3
 */

import * as abstracts from '@razomy/abstracts';

// region Abstracts

export type SyntaxLayer = 'expression' | 'statement' | 'shape' | 'macro' | 'meta';
export type SstKey = string;

/**
 * The foundational interface for all AST nodes.
 * @abstract
 */
export interface SstNode {
  /**
   * @abstract
   */
  kind: string;
  syntaxLayer: SyntaxLayer;
  layers: Record<SstKey, SstNode>;
}

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
export interface StateSst extends SstNode {
}

export interface OperationSst extends SstNode {
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
export interface LogicSst extends SstNode {
}

export interface LogicOperatorSst extends SstNode {
}

/**
 * Base interface for all declarations.
 * Represents creating an entity with a specific name and state.
 * Request memory
 * @example
 * ```ts
 * * Identifier with Sst assignment
 * `const x:number` or `interface User {}`
 * ```
 * @abstract
 */
export interface DeclarationSst extends SstNode {
}

export interface AccessSst extends SstNode {
}

export interface PanicSst extends SstNode {
}

/**
 * @abstract
 */
export type SstLeafType =
  StateSst
  | OperationSst
  | LogicSst
  | LogicOperatorSst
  | DeclarationSst
  | AccessSst
  | PanicSst;

// endregion Abstracts

/**
 * @final
 */
export interface IdentifierSst extends SstNode {
  kind: 'Identifier';
  name: string;
}

// region State

/**
 * Represents a template literal type.
 * @example
 * ```ts
 * a = 1;
 * "user_${a}"
 * ```
 * @final
 * @deprecated should be a natural language code use Sst instead
 */
export interface TemplateSst extends StateSst {
  kind: 'TemplateSst';
  elements: SstType[];
}

/**
 * Represents an array literal containing various expressions.
 * @example
 * ```ts
 * [1, 2, "text"]
 * ```
 * @final
 */
export interface ArraySst extends StateSst {
  kind: 'ArraySst';
  elements: SstType[];
}

export interface TupleSst extends StateSst {
  kind: 'TupleSst';
  elements: SstType[];
}


/**
 * Represents a property inside an object literal value.
 * @example
 * ```ts
 * name: "John" inside { name: "John" }
 * ```
 * @final
 */
export interface PropertySst extends StateSst {
  kind: 'PropertySst';
  identifier: IdentifierSst;
  modifiers: Array<'optional' | 'const'>;
  elements: SstType[];
}

/**
 * Represents an object literal value.
 * Contains functions
 * @example
 * ```ts
 * { name: "John", age: 30 }
 * ```
 * @final
 */
export interface ObjectSst extends StateSst {
  kind: 'ObjectSst';
  elements: PropertySst[];
}

/**
 * Represents a mapped type.
 * @example
 * ```ts
 * { [K in keyof User]: boolean }
 * ```
 * @final
 */
export interface MappedShapeSst extends OperationSst {
  kind: 'MappedShape';
  identifier: IdentifierSst;
  constraint: SstType;
  value: SstType;
}

export type StateSstType =
  | ArraySst
  | ObjectSst
  | TemplateSst
  | MappedShapeSst
  | PropertySst;


// endregion State
// region Operation

/**
 * Унарные операции: !1, ++1, x--, -5, +x, ~2, typeof x, delete x
 * @final
 */
export interface UnarySst extends OperationSst {
  kind: 'UnarySst';
  operator:
    | '&' // AddressOfSst
    | '*' // DereferenceSst
    | '!' // Логическое НЕ
    | '+' // Унарный плюс (приведение к числу)
    | '-' // Унарный минус (отрицание)
    | '~' // Побитовое НЕ
    | '++' // Инкремент
    | '--' // Декремент
    | 'typeof' // Определение типа
    | 'as' // Определение типа
    | 'delete'; // Удаление свойства
  value: SstType; // В стандарте ESTree это обычно называется 'argument'
  isPrefix: boolean; // true для ++x, false для x++
  shape: SstType | null;
}

/**
 * Бинарные операции: 1 + 1, 3 & 4, x === y, a ** b
 * @final
 */
export interface BinarySst extends OperationSst {
  kind: 'BinarySst';
  operator: // Арифметика
    | '+'
    | '-'
    | '*'
    | '/'
    | '%'
    | '**'
    // Побитовые операции
    | '&'
    | '|'
    | '^'
    | '<<'
    | '>>'
    | '>>>'
    // Сравнение (строгое и нестрогое)
    | '=='
    | '!='
    | '==='
    | '!=='
    // Отношение
    | '<'
    | '<='
    | '>'
    | '>='
    // Проверка наличия/типа
    | 'in';
  left: SstType;
  right: SstType;
}

export type OperationType =

  | UnarySst
  | BinarySst
  ;
// endregion Operation
// region Logic

export interface IfBranchFlowSst extends LogicSst {
  kind: 'IfBranchFlowSst';
  pattern: SstType | null; // null = else
  value: SstType;
}

export interface IfConditionalFlowSst extends LogicOperatorSst {
  kind: 'IfConditionalFlowSst';
  branches: IfBranchFlowSst[];
}


export interface SwitchBranchFlowSst extends LogicSst {
  kind: 'SwitchBranchFlowSst';
  pattern: SstType | null; // null = default
  value: SstType;
}

export interface SwitchConditionalFlowSst extends LogicOperatorSst {
  kind: 'SwitchConditionalFlowSst';
  target: SstType;
  branches: SwitchBranchFlowSst[];
}

export interface DoWhileLoopFlowSst extends LogicSst {
  kind: 'DoWhileLoopFlowSst';
  condition: SstType;
  value: SstType;
}

export interface WhileDoLoopFlowSst extends LogicSst {
  kind: 'WhileDoLoopFlowSst';
  condition: SstType;
  value: SstType;
}

export interface ForInLoopFlowSst extends LogicSst {
  kind: 'ForInLoopFlowSst';
  init: SstType;
  value: SstType;
}

export interface ForOfLoopFlowSst extends LogicSst {
  kind: 'ForOfLoopFlowSst';
  init: SstType;
  value: SstType;
}

export interface ForItLoopFlowSst extends LogicSst {
  kind: 'ForItLoopFlowSst';
  init: SstType | null;
  // null = for
  condition: SstType | null;
  // null = while
  update: SstType | null;
  value: SstType;
}

/**
 * Represents a block of scoped statements.
 * {...;}
 * @final
 */
export interface BlockSst extends LogicSst {
  kind: 'BlockSst';
  declarations: SstType[];
}


export type LogicSstType =
  | IfConditionalFlowSst
  | SwitchConditionalFlowSst
  | DoWhileLoopFlowSst
  | WhileDoLoopFlowSst
  | ForInLoopFlowSst
  | ForOfLoopFlowSst
  | ForItLoopFlowSst
  ;

/**
 * Represents a return statement.
 * return ...;
 * @final
 */
export interface ReturnSst extends LogicOperatorSst {
  kind: 'ReturnSst';
  // null - void
  argument: SstType | null;
}

export interface BreakGoSst extends LogicOperatorSst {
  kind: 'BreakGoSst';
  labelIdentifier: IdentifierSst | null;
}

export interface ContinueGoSst extends LogicOperatorSst {
  kind: 'ContinueGoSst';
  labelIdentifier: IdentifierSst | null;
}


export type LogicOperatorSstType =
  | ReturnSst
  | BlockSst
  | BreakGoSst
  | ContinueGoSst;

// endregion Logic
// region Declaration


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
/**
 * Represents a variable declaration.
 * @example
 * ```ts
 * const myVar: string = "hello";
 * ```
 * @final
 */
export interface BindingSst extends DeclarationSst {
  kind: 'BindingSst';
  identifier: IdentifierSst;
  type: 'instance' | 'subclass' | 'assign';
  shape: SstType | null;
  value: SstType;
  modifiers: Array<'const'>;
  meta: abstracts.domains.HasDescription;
}

/**
 * Represents an value used as a statement.
 * a = ... ;
 * @final
 */
export interface AssignSst extends DeclarationSst {
  kind: 'AssignSst';
  identifier: IdentifierSst;
  value: SstType;
}

/**
 * Represents an external dependency declaration.
 * @example
 * ```ts
 * import * as abstracts from "@razomy/abstracts";
 * ```
 * @final
 * @deprecated it should be alias variables `myPkg = npm:My-pckg:version:relative/path;`
 */
export interface DependencySst extends DeclarationSst {
  kind: 'DependencySst';
  identifier: IdentifierSst;
  version: string;
  path: string;
}


/**
 * Represents a parameter in a function declaration or signature.
 * @example
 * ```ts
 * (cat=args: string[],)
 * ```
 * @final
 */
export interface ParameterSst extends DeclarationSst {
  kind: 'ParameterSst';
  identifier: IdentifierSst;
  shape: SstType | null;
  meta: abstracts.domains.HasDescription;
  value: SstType | null;
  modifiers: ('rest')[];
}

export interface FunctionSst extends DeclarationSst {
  kind: 'FunctionSst';
  elements: SstType[]
}


/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * interface Admin extends User { role: string; }
 * ```
 * @final
 * @deprecated rethink concept adaptive context mapping
 */
export interface StructSst extends DeclarationSst {
  kind: 'ClassSst';
  meta: abstracts.domains.HasDescription;
  identifier: IdentifierSst;
  extends_: SstType[];
  properties: PropertySst[];
}


/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * interface Admin extends User { role: string; }
 * ```
 * @final
 * @deprecated rethink luck of flexibility
 */
export interface InterfaceSst extends DeclarationSst {
  kind: 'InterfaceSst';
  meta: abstracts.domains.HasDescription;
  identifier: IdentifierSst;
  extends_: SstType[];
  properties: PropertySst[];
}

/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * interface Admin extends User { role: string; }
 * ```
 * @final
 * @deprecated rethink concept adaptive context mapping
 */
export interface ClassSst extends DeclarationSst {
  kind: 'ClassSst';
  meta: abstracts.domains.HasDescription;
  identifier: IdentifierSst;
  extends_: SstType[];
  properties: PropertySst[];
  methods: FunctionSst[];
}

/**
 * Represents a module or namespace declaration.
 * @example
 * ```ts
 * namespace MyModule { export const x = 1; }
 * ```
 * @final
 * @deprecated no need use Block as scope
 */
export interface ModuleSst extends DeclarationSst {
  kind: 'ModuleSst';
  meta: abstracts.domains.HasDescription;
  identifier: IdentifierSst;
  block: BlockSst;
}

/**
 * Represents a package definition (like package.json).
 * @example
 * ```ts
 * Represents a module with dependencies.
 * ```
 * @final
 * @deprecated no need use Block as scope
 */
export interface PackageSst extends DeclarationSst {
  kind: 'PackageSst';
  identifier: IdentifierSst;
  meta: abstracts.domains.HasDescription;
  version: string;
  runtime: DependencySst;
  dependencies: DependencySst[];
  block: BlockSst;
}


export type DeclarationSstType =
  | BindingSst
  | DependencySst
  | ParameterSst
  | StructSst
  | AssignSst
  | FunctionSst
  | InterfaceSst
  | ModuleSst
  | PackageSst
  | ClassSst;

// endregion Declaration
// region Access
/** name(1,2) | (1,2)
 * @final
 */
export interface CallSst extends AccessSst {
  kind: 'CallSst';
  // null = call()()
  identifier: IdentifierSst | null;
  modifiers: Array<'spread' | 'async'>;
  arguments_: SstType[];
}

/**
 * Вызов макроса. Обрати внимание, что аргументы могут быть не выражениями,
 * а сырым текстом/токенами, если макрос определяет свой DSL.
 * @example Rust: `println!("{}, {}", x, y)`, `vec![1, 2, 3]`
 * @deprecated must be code injection as lang plugin not a virtual code TODO: Create injection node
 */
export interface MacroCallSst extends AccessSst {
  kind: 'MacroCallSst';
  identifier: IdentifierSst;
  arguments_: abstracts.translators.Token[];
}

/**
 * @example .a | [1]
 */
export interface MemberSst extends AccessSst {
  kind: 'MemberSst';
  object_: SstType;
  property: SstType;
}

export interface ReferenceSst extends AccessSst {
  kind: 'ReferenceSst';
  identifier: IdentifierSst;
  modifiers: Array<'spread' | 'await'>;
}


export type AccessSstType =
  | CallSst
  | MacroCallSst
  | MemberSst
  | ReferenceSst;


// endregion Access
// region Panic


/**
 * Represents a throw statement.
 * @final
 * @deprecated uniq data type instead and data validation
 */
export interface TrySst extends PanicSst {
  kind: 'TrySst';
  block: BlockSst;
  catches: CatchSst[];
}

/**
 * Represents a throw statement.
 * @final
 * @deprecated uniq data type instead and data validation
 */
export interface CatchSst extends PanicSst {
  kind: 'CatchSst';
  trigger: ParameterSst;
  block: BlockSst;
}

/**
 * Represents a throw statement.
 * @final
 * @deprecated uniq data type instead and data validation
 */
export interface ThrowSst extends PanicSst {
  kind: 'ThrowSst';
  argument: SstType;
}

// endregion Operation

export type PanicSstType =
  | CatchSst
  | TrySst
  | ThrowSst;


export type SstType =
  StateSstType
  | DeclarationSstType
  | LogicSstType
  | LogicOperatorSstType
  | AccessSstType
  | PanicSstType;
