/**
 * Суть: Описывает Синтаксис
 * Код разделен на два параллельных пространства:
 * 1. Пространство значений - сущетвуют в копилированом коде Rust Kotlin Python Ts
 * - Expression — возврашают значение (вычисляемые, data, structure in memory).
 * - Statement — меняют значение в рамках блока (for, while).
 * - Binding — Declaration + Statement, связывание объявленного имени с конкретным действием/результатом.
 * 2. Пространство типов - существуют в только на этапе разработки - сахар
 * - Shape — группирование Expression по общему признаку.
 * - ShapeBinding — TypeDeclaration + TypeExpression (связывание имени типа с его правилами и структурой).
 * 3. Онтология - текстовое описание процессов Inform 7,Attempto Controlled English,Cucumber
 * - Concept (Концепт) — аналог Binding и Shape. Это декларация фактов, правил игры, объектов и их типов. То, что валидируется до выполнения.
 * - Clause (Клауза/Фраза) — аналог Statement и Expression. Это активные действия, происходящие в рантайме.
 */

import type {Token} from "./token";

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

// region Data - Level 1
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
 * @abstract
 */
export interface Identifier extends AstNode {
  name: string;
}

/**
 * Base interface for all declarations.
 * Represents creating an entity with a specific name and state.
 * Request memory
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
export type AstValueType = Expression | Statement | Binding;

// region Expression

/**
 *
 * @example
 * @final
 */
export interface BuildInExpression extends Expression {
  kind: 'BuildInExpression';
  type: 'RegExp' | 'string' | 'number' | 'boolean' | 'null';
  value: string;
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
  type: 'array' | 'tuple';
  expressions: T[];
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
 * Унарные операции: !1, ++1, x--, -5, +x, ~2, typeof x, delete x
 * @final
 */
export interface UnaryExpression extends Expression {
  kind: 'UnaryExpression';
  operator:
    | '&'      // AddressOfExpression
    | '*'      // DereferenceExpression
    | '!'      // Логическое НЕ
    | '+'      // Унарный плюс (приведение к числу)
    | '-'      // Унарный минус (отрицание)
    | '~'      // Побитовое НЕ
    | '++'     // Инкремент
    | '--'     // Декремент
    | 'typeof' // Определение типа
    | 'delete';// Удаление свойства
  expression: ExpressionType; // В стандарте ESTree это обычно называется 'argument'
  isPrefix: boolean;          // true для ++x, false для x++
}

/**
 * Бинарные операции: 1 + 1, 3 & 4, x === y, a ** b
 * @final
 */
export interface BinaryExpression extends Expression {
  kind: 'BinaryExpression';
  operator:
  // Арифметика
    | '+' | '-' | '*' | '/' | '%' | '**'
    // Побитовые операции
    | '&' | '|' | '^' | '<<' | '>>' | '>>>'
    // Сравнение (строгое и нестрогое)
    | '==' | '!=' | '===' | '!=='
    // Отношение
    | '<' | '<=' | '>' | '>='
    // Проверка наличия/типа
    | 'in'
  left: ExpressionType;
  right: ExpressionType;
}

export interface ControlBranchExpression extends Expression {
  kind: 'ControlBranch';
  type: 'if' | 'switch';
  pattern: Expression | null;
  body: BlockExpression;
}

export interface ConditionalControlFlowExpression extends Expression {
  kind: 'ConditionalControlFlow';
  target: Expression | null;
  branches: ControlBranchExpression[];
}

export interface LoopControlFlowExpression extends Expression {
  kind: 'LoopControlFlow';
  type: 'do_while' | 'while_do' | 'for_in' | 'for_of'
  init: Expression | null;
  condition: Expression | null;

  // Шаг цикла (i++; или получение следующего элемента yield/next)
  update: Expression | null;

  body: BlockExpression;
}

/** name(1,2) | (1,2)
 * @final
 */
export interface CallExpression extends Expression {
  kind: 'CallExpression';
  identifier: Identifier | null;
  arguments_: ExpressionType[];
}

/**
 * Вызов макроса. Обрати внимание, что аргументы могут быть не выражениями,
 * а сырым текстом/токенами, если макрос определяет свой DSL.
 * @example Rust: `println!("{}, {}", x, y)`, `vec![1, 2, 3]`
 */
export interface MacroCallExpression extends Expression {
  kind: 'MacroCallExpression';
  identifier: Identifier;
  arguments: Token;
}

/**
 * @example .a | [1]
 */
export interface MemberExpression extends Expression {
  kind: 'MemberExpression';
  property: ExpressionType; // propertyExpression or number ...
}

/**
 * Represents a return statement.
 * return ...;
 * @final
 */
export interface ReturnExpression extends Expression {
  kind: 'ReturnExpression';
  argument: ExpressionType | null;
}

export interface BlockExpression extends Expression {
  kind: 'BlockExpression';
  statements: StatementType[];
  result: ReturnExpression;
}

export type ExpressionType =
  | BuildInExpression
  | ArrayExpression
  | ObjectExpression
  | PropertyExpression
  | UnaryExpression
  | ConditionalControlFlowExpression
  | LoopControlFlowExpression
  | CallExpression
  | MacroCallExpression
  | BinaryExpression
  | BlockExpression
  | ReturnExpression
  | MemberExpression
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
  statements: StatementType[];
}

export interface ControlBranchStatement extends Statement {
  kind: 'ControlBranch';
  type: 'if' | 'switch' | 'try_catch'
  pattern: Expression | null;
  body: BlockStatement;
}

export interface ConditionalControlFlowStatement extends Statement {
  kind: 'ConditionalControlFlow';
  target: Expression | null;
  branches: ConditionalControlFlowStatement[];
}

export interface LoopControlFlowStatement extends Statement {
  kind: 'LoopControlFlow';
  type: 'do_while' | 'while_do' | 'for_in' | 'for_of'
  init: Expression | null;
  condition: Expression | null;
  update: Expression | null;

  body: BlockStatement;
}

export interface LoopBreakStatement extends Statement {
  kind: 'LoopControlFlow';
  type: 'break' | 'continue'
  labelIdentifier: Identifier;
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
  shapeIdentifier: ShapeIdentifier | null;
  description: string;
}

export type StatementType =
  | BlockStatement
  | LoopControlFlowStatement
  | ConditionalControlFlowStatement
  | ControlBranchStatement
  | LoopBreakStatement
  | VariableStatement
  | ThrowStatement
  ;

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
  shapeIdentifier: ShapeIdentifier;
  isConst: boolean;
  description: string;
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
  shapeIdentifier: ShapeIdentifier | null;
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
  shapeIdentifier: ShapeIdentifier | null;
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

export type  Modifier = 'async' | 'export' | 'public'

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
  types: ShapeBindingType[];
  returnType: ReturnShape | null;
  modifiers: Modifier[];
  body: SbsbType[];
  meta: {
    title: string;
    performance: {
      timeDataSizeComplexityFn: string;
      memoryDataSizeComplexityFn: string;
      history: any[];
    };
    examples: Array<{ code: string; expected: string }>;
    description: string;
  }
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
  extends_: ShapeIdentifier[];
  properties: PropertyBinding[];
  methods: FunctionBinding[];
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
  body: SbsbType[];
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
  runtime: DependencyBinding;
  dependencies: DependencyBinding[];
  body: SbsbType[];
}

/**
 * Объявление макроса.
 * @example Rust: `macro_rules! my_macro { ... }`
 */
export interface MacroBinding extends Binding {
  kind: 'MacroBinding';
  identifier: Identifier;
  rules: Array<{ pattern: Token[]; template: Token[] }>;
}

export type BindingType =
  VariableBinding
  | DependencyBinding
  | PropertyBinding
  | ParameterBinding
  | EnumPropertyBinding
  | EnumBinding
  | FunctionBinding
  | ModuleBinding
  | PackageBinding
  | MacroBinding
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
export interface Shape extends AstNode {
}


/**
 * A reference to an existing type, class, or interface.
 * @example
 * ```ts
 * UserType
 * ```
 * @final
 */
export interface ShapeIdentifier extends Identifier {
  name: string;
}

/*
 * @abstract
 */
export interface ShapeStatement extends AstNode {
}

/*
 * @abstract
 */
export interface ShapeBinding extends AstNode {
}

export type AstShapeType = Shape | ShapeStatement | ShapeBinding;

// region ShapeType

/**
 * Унарные операции: typeof x
 * @final
 */
export interface UnaryShape extends Shape {
  kind: 'UnaryShape';
  operator:
    | 'typeof' | 'as'
  expression: ExpressionType;
}

/**
 * Built-in language primitives.
 * Includes BuildIn types like string, number, etc.
 * @example
 * ```ts
 * string, number, boolean, any
 * ```
 * @final
 */
export interface BuildInShape extends Shape {
  kind: 'BuildInShape';
  type: | 'String' | 'Number' | 'Object' | 'Boolean' | 'Null' | 'Undefined' | 'Symbol' | 'Any' | 'Never' | 'Unknown' | 'Bigint' | 'Void';
  value: string | null;
}

/**
 * Represents a template literal type.
 * @example
 * ```ts
 * \\user_${number}\\
 * ```
 * @final
 */
export interface TemplateShape extends Shape {
  kind: 'TemplateShape';
  template: string;
  types: ShapeType[];
}

/**
 * Represents a mapped type.
 * @example
 * ```ts
 * { [K in keyof User]: boolean }
 * ```
 * @final
 */
export interface MappedShape extends Shape {
  kind: 'MappedShape';
  identifier: Identifier;
  constraint: ShapeType;
  shape: ShapeType;
}

/**
 * Represents an array type.
 * @example
 * ```ts
 * string[]
 * ```
 * @final
 */
export interface ArrayShape extends Shape {
  kind: 'ArrayShape';
  type: 'array' | 'tuple';
  shape: ShapeType;
}

/**
 * Represents a property defined inside a type or interface.
 * @example
 * ```ts
 * readonly id: string;
 * ```
 * @final
 */
export interface PropertyShape extends Shape {
  kind: 'PropertyShape';
  shapeIdentifier: ShapeIdentifier;
  shape: ShapeType;
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
export interface ObjectShape extends Shape {
  kind: 'ObjectShape';
  properties: PropertyShape[];
}

/**
 * A reference to a generic type with type arguments.
 * @example
 * ```ts
 * Promise<string>
 * ```
 * @final
 */
export interface GenericReferenceShape extends Shape {
  kind: 'GenericReferenceShape';
  shapeIdentifier: ShapeIdentifier;
  types: ShapeType[];
}

/**
 * Represents a union type.
 * @example
 * ```ts
 * string | number
 * ```
 * @final
 */
export interface UnionShape extends Shape {
  kind: 'UnionShape';
  types: ShapeType[];
}

/**
 * Represents an intersection type.
 * @example
 * ```ts
 * User & Timestamped
 * ```
 * @final
 */
export interface IntersectionShape extends Shape {
  kind: 'IntersectionShape';
  types: ShapeType[];
}

/**
 * (): String
 */
export interface ReturnShape extends Shape {
  kind: 'ReturnShape';
  shapeIdentifier: ShapeIdentifier;
  description: string;
}

/**
 * Represents a function type signature.
 * @example
 * ```ts
 * (price: number) => number
 * ```
 * @final
 */
export interface FunctionShape extends Shape {
  kind: 'FunctionShape';
  parameters: PropertyShape[];
  returnType: ShapeType | null;
}

export type ShapeType =
  | ShapeIdentifier
  | ArrayShape
  | BuildInShape
  | ObjectShape
  | TemplateShape
  | UnaryShape
  | MappedShape
  | GenericReferenceShape
  | UnionShape
  | IntersectionShape
  | ReturnShape
  | FunctionShape
  ;


// endregion ShapeType
// region TypeBinding

/**
 * Represents a type alias declaration.
 * @example
 * ```ts
 * type MyCustomType = string | number;
 * ```
 * @final
 */
export interface AliasShapeBinding extends ShapeBinding {
  kind: 'AliasShapeBinding';
  description: string;
  shapeIdentifier: ShapeIdentifier;
  shape: ShapeType;
}

/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * interface Admin extends User { role: string; }
 * ```
 * @final
 */
export interface InterfaceShapeBinding extends ShapeBinding {
  kind: 'InterfaceShapeBinding';
  description: string;
  shapeIdentifier: ShapeIdentifier;
  extends_: ShapeIdentifier[];
  properties: PropertyShape[];
}


export type ShapeBindingType = InterfaceShapeBinding
  | AliasShapeBinding
  ;

// endregion ShapeBinding
// endregion Shape

// ==========================================
// ПРОСТРАНСТВО ОНТОЛОГИИ (ТИПЫ И ФАКТЫ) - Concept
// ==========================================

export interface Concept extends AstNode {}
export interface Clause extends AstNode {}

/**
 * Роль участника в отношении (Тематическая роль).
 * В AMR это :ARG0, :ARG1, :location, :time.
 * В твоем языке это могут быть "Кто", "Кого", "Где", "Чем".
 */
export interface SemanticRole extends AstNode {
  kind: 'SemanticRole';
  name: string; // 'actor', 'theme', 'instrument', 'location'
}

/**
 * Универсальное наследование и инстанцирование.
 * Заменяет DefinitionConcept и InstanceConcept.
 * @example
 * "Комната — это вид хранилища." -> relation: 'subclass'
 * "Библиотека — это комната."   -> relation: 'instance'
 */
export interface TaxonomyConcept extends Concept {
  kind: 'TaxonomyConcept';
  subject: Identifier;     // "Библиотека"
  relation: 'instance' | 'subclass';
  base: Identifier;        // "Комната"
}

/**
 * Описание сигнатуры Предиката (Глагола, Свойства, Отношения).
 * Универсальная замена для VerbSignatureConcept.
 * Здесь мы говорим компилятору, КАКИЕ роли поддерживает предикат и КАКИЕ типы они требуют.
 * @example
 * "Глагол [передать] требует (Кто:Человек, Что:Предмет, Кому:Человек)."
 */
export interface PredicateSignatureConcept extends Concept {
  kind: 'PredicateSignatureConcept';
  predicate: Identifier; // "передать" (или "находится", или "темный")
  roles: Array<{
    role: SemanticRole;       // 'actor', 'theme', 'recipient'
    constraint: Identifier;   // 'Человек', 'Предмет', 'Человек'
  }>;
}

/**
 * Универсальный Факт (Состояние мира).
 * Заменяет AdjectiveConcept и RelationConcept.
 * По сути, это узел графа: Предикат связывает набор аргументов.
 * @example
 * "Книга находится на столе" -> predicate: "находится", args: [theme: "Книга", location: "стол"]
 * "Библиотека темная" -> predicate: "темная", args: [theme: "Библиотека"]
 */
export interface FactConcept extends Concept {
  kind: 'FactConcept';
  predicate: Identifier; // "находится" или "темная"
  isNegative: boolean;   // false (утверждение), true (отрицание: "не находится")
  arguments: Array<{
    role: SemanticRole;
    value: Identifier | ExpressionType; // Связь с классическим кодом (value может быть числом/строкой)
  }>;
}

// ==========================================
// ПРОСТРАНСТВО ДЕЙСТВИЙ И ПРАВИЛ (РАНТАЙМ) - Clause
// ==========================================

/**
 * Универсальное Действие (Событие в динамике).
 * В AMR любое действие — это экземпляр события (Event/Action) с ролями.
 * @example
 * "Джон открывает дверь ключом"
 * predicate: "открыть"
 * args: [actor: "Джон", theme: "дверь", instrument: "ключ"]
 */
export interface ActionClause extends Clause {
  kind: 'ActionClause';
  predicate: Identifier; // "открыть"
  arguments: Array<{
    role: SemanticRole;
    value: Identifier | ExpressionType;
  }>;
}

/**
 * Универсальная мутация графа знаний.
 * Заменяет MutationClause ('state_change' | 'move_object').
 * Любое изменение в мире — это добавление нового факта или удаление старого.
 * @example
 * "Теперь библиотека освещена" -> assert Fact(освещена, [theme: библиотека])
 * "Джон больше не носит шляпу" -> retract Fact(носит, [actor: Джон, theme: шляпа])
 */
export interface StateTransitionClause extends Clause {
  kind: 'StateTransitionClause';
  operation: 'assert' | 'retract'; // Добавить факт или Удалить факт
  fact: FactConcept; // Факт, который применяется к миру
}

/**
 * Паттерн-матчинг событий (Универсальные правила).
 * Заменяет EventRuleClause. Теперь мы фильтруем не по жестким полям, а по графу фактов!
 * @example
 * "Вместо (Action: Джон открывает дверь), ЕСЛИ (Fact: дверь закрыта):"
 */
export interface RuleClause extends Clause {
  kind: 'RuleClause';
  phase: 'before' | 'instead_of' | 'after' | 'always';

  // Какое действие пытаемся перехватить (может содержать null как wildcard)
  triggerPattern: ActionClause;

  // Дополнительные проверки в графе знаний (AMR Subgraph matching)
  conditions: FactConcept[];

  body: BlockClause;
}

/**
 * Блок выполнения.
 */
export interface BlockClause extends Clause {
  kind: 'BlockClause';
  clauses: ExecutableClauseType[];
}

export type ConceptType =
  | TaxonomyConcept
  | PredicateSignatureConcept
  | FactConcept;

export type ExecutableClauseType =
  | ActionClause
  | StateTransitionClause
  | RuleClause;

export type SbsbType = StatementType | BindingType | ShapeBindingType;

export type AstType = AstValueType | AstShapeType;
