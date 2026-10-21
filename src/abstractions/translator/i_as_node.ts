import * as abstractions from '@razomy/abstractions';
// region Ontology

/**
 * Ontology
 * Chaos
 *  0. Panic: try catch
 * Concept
 *  1. Abstraction: a 0
 *  2. State: 42 'a' {a:1}
 * Transition
 *  3. Operation: + - ?: ()=>
 * Cause-following
 *  4. Flow: 1 or b
 *     FlowOperator: break; continue;
 * Postpone
 *  5. Declaration: record A{ a:1} function class
 *     DeclarationOperatorAsn
 *  6. Bindings: a = 1
 *  7. Access: .method()
 * Recursion
 *  8. Modifier: public a
 *  9. Layers: #Macros(), `Docs`
 *
 * @checklist
 * [] 'kind:name' same as interface Name
 * [] @abstract properties and interfaces and corrent implementation
 * [] no null usage
 * [] single/pural
 * [] property same as Type Base - identifier:Identifier, shapes: Shapes ...
 *    uniq name or opposite names pairs or integration names in one scope - animal, cat | dog, cat1|cat2|cat3
 * [] shape and SemanticLayer - for all value init
 * [] strict layer no intersections
 *
 */

export type AsnKey = string;

// Syntactic parallel: role of text
export type SyntaxRole =
  | 'text' // Docs, comments, markdown
  | 'expression' // Evaluates to a value (literals, calls)
  | 'statement' // Control flow & side effects (if, loops)
  | 'declaration' // Bindings (vars, functions, classes)
  | 'modifier'; // options like public

// Semantic depth: level of abstraction
export type SemanticLayer =
  | 'state' // Runtime values, memory, state
  | 'shape' // Types, interfaces, schemas
  | 'generic' // Generics, type constructors
  | 'meta'; // Macros, decorators, reflection

/**
 * The foundational interface for all AST nodes.
 * @abstract
 */
export interface IAsNode extends abstractions.patterns.ISyntax {
  /**
   * @abstract
   */
  kind: AsnKey;
  syntaxRole: SyntaxRole;
}

/**
 * @abstract
 */
export interface IPanicAsn extends IAsNode {}

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
export interface IStateAsn extends IAsNode {
  semanticLayer: SemanticLayer; // 1
}

/**
 * @abstract
 */
export interface IOperationAsn extends IAsNode {}

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
export interface IFlowAsn extends IAsNode {}

/**
 * @abstract
 */
export interface IFlowOperatorAsn extends IAsNode {}

/**
 * @abstract
 */
export interface IDeclarationAsn extends IAsNode {}

export interface IDeclarationOperatorAsn extends IAsNode {}

/**
 * Base interface for all declarations.
 * Represents creating an entity with a specific name and state.
 * Request memory
 * @example
 * ```ts
 * * Identifier with Asn assignment
 * `const x:number` or `interface User {}`
 * ```
 * @abstract
 */
export interface IBindingAsn extends IAsNode {}

/**
 * @abstract
 */
export interface IAccessAsn extends IAsNode {}

export interface IModifierAsn extends IAsNode {}

export interface ILayerAsn extends IAsNode {}

/**
 * @abstract
 */
export type OntologyAsnType =
  | IPanicAsn
  | IStateAsn
  | IOperationAsn
  | IFlowAsn
  | IFlowOperatorAsn
  | IBindingAsn
  | IDeclarationAsn
  | IDeclarationOperatorAsn
  | IAccessAsn
  | IModifierAsn
  | ILayerAsn;

// endregion Ontology

/**
 * @final
 */
export interface Identifier {
  name: string;
}

// region Panic

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface ThrowAsn extends IPanicAsn {
  kind: 'ThrowAsn';
  value: StateAsnType;
}

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface TryAsn extends IPanicAsn {
  kind: 'TryAsn';
  block: BlockAsn;
}

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface CatchAsn extends IPanicAsn {
  kind: 'CatchAsn';
  condition: AsnType;
  block: BlockAsn;
}

export interface DefaultCatchAsn extends IPanicAsn {
  kind: 'DefaultCatchAsn';
  block: BlockAsn;
}

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface FinallyAsn extends IPanicAsn {
  kind: 'FinallyAsn';
  block: StateAsnType;
}

export type PanicAsnType = CatchAsn | DefaultCatchAsn | TryAsn | ThrowAsn | FinallyAsn;

// endregion Panic

// region State

export interface LiteralAsn extends IStateAsn {
  kind: 'LiteralAsn';
  value: any; // 0001-01-01
}

/**
 * Represents a template literal type.
 * @example
 * ```ts
 * a = 1;
 * "user_${a}"
 * ```
 * @final
 */
export interface TemplateAsn extends IStateAsn {
  kind: 'TemplateAsn';
  values: AsnType[];
}

/**
 * Represents an array literal containing various expressions.
 * @example
 * ```ts
 * [1, 2, "text"]
 * ```
 * @final
 */
export interface ArrayAsn extends IStateAsn {
  kind: 'ArrayAsn';
  values: AsnType[];
}

export interface TupleAsn extends IStateAsn {
  kind: 'TupleAsn';
  values: AsnType[];
}

/**
 * Represents a property inside an object literal value.
 * @example
 * ```ts
 * name: "John" inside { name: "John" }
 * ```
 * @final
 * @complexity danger use BindingAsn instead
 */
export interface PropertyAsn extends IStateAsn {
  kind: 'PropertyAsn';
  identifier: Identifier;
  shape: AsnType | null;
  value: AsnType | null;
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
export interface ObjectAsn extends IStateAsn {
  kind: 'ObjectAsn';
  modifiers: ModifierAsnTypes[];
  properties: PropertyAsn[];
}

/**
 * Represents a mapped type.
 * @example
 * ```ts
 * { [K in keyof User]: boolean }
 * ```
 * @final
 */
export interface MappedAsn extends IStateAsn {
  kind: 'MappedAsn';
  constraint: AsnType;
  value: StateAsnType;
}

export type StateAsnType = LiteralAsn | ArrayAsn | TupleAsn | ObjectAsn | TemplateAsn | MappedAsn | PropertyAsn;

// endregion State

// region Operation

/**
 * Унарные операции: !1, ++1, x--, -5, +x, ~2, typeof x, delete x
 * @final
 */
export interface UnaryAsn extends IOperationAsn {
  kind: 'UnaryAsn';
  operator:
    | '&' // AddressOfAsn
    | '*' // DereferenceAsn
    | '!' // Логическое НЕ
    | '+' // Унарный плюс (приведение к числу)
    | '-' // Унарный минус (отрицание)
    | '~' // Побитовое НЕ
    | '++' // Инкремент
    | '--' // Декремент
    | 'rest';
  value: StateAsnType;
  isPrefix: boolean; // true для ++x, false для x++
}

export interface SpreadAsn extends IOperationAsn {
  kind: 'SpreadAsn';
  value: StateAsnType;
}

export interface ShapingAsn extends IOperationAsn {
  kind: 'ShapingAsn';
  operator: 'typeof' | 'as' | '(parenting)' | 'satisfies';
  semanticLayer: SemanticLayer;
  value: StateAsnType;
}

/**
 * Бинарные операции: 1 + 1, 3 & 4, x === y, a ** b
 * @final
 */
export interface BinaryAsn extends IOperationAsn {
  kind: 'BinaryAsn';
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
    | 'in'
    | 'is';
  left: AsnType;
  right: AsnType;
}

export type OperationAsnType = UnaryAsn | SpreadAsn | ShapingAsn | BinaryAsn;

// endregion Operation

// region Flow
/**
 * @abstract
 */
export interface MatchAsn extends IFlowAsn {}

export interface TernaryAsn extends MatchAsn {
  kind: 'TernaryAsn';
  branches: IfBranchAsnType[];
}

export interface IfAsn extends MatchAsn {
  kind: 'IfAsn';
  branches: IfBranchAsnType[];
}

export interface SwitchAsn extends MatchAsn {
  kind: 'SwitchAsn';
  target: AsnType;
  branches: SwitchBranchAsnType[];
}

/**
 * @abstract
 */
export interface LoopAsn extends IFlowAsn {}

export interface DoWhileAsn extends LoopAsn {
  kind: 'DoWhileAsn';
  condition: AsnType;
  block: BlockAsn;
}

export interface WhileDoAsn extends LoopAsn {
  kind: 'WhileDoAsn';
  condition: AsnType;
  block: BlockAsn;
}

/**
 * Iterate
 */
export interface ForIAsn extends LoopAsn {
  kind: 'ForInAsn';
  init: abstractions.meta.NullOptional<AsnType>;
  condition: abstractions.meta.NullOptional<AsnType>;
  update: abstractions.meta.NullOptional<AsnType>;
  block: BlockAsn;
}

/**
 * Array
 */
export interface ForOfAsn extends LoopAsn {
  kind: 'ForOfAsn';
  init: AsnType;
  block: BlockAsn;
}

/**
 * Object
 */
export interface ForItAsn extends LoopAsn {
  kind: 'ForItAsn';
  init: abstractions.meta.NullOptional<AsnType>;
  condition: abstractions.meta.NullOptional<AsnType>;
  update: abstractions.meta.NullOptional<AsnType>;
  block: BlockAsn;
}

/**
 * Represents a block of scoped statements.
 * @example
 * ()=>{...;}
 * {...;}, () - return - must use return value
 * @final
 */
export interface BlockAsn extends IFlowAsn {
  kind: 'BlockAsn';
  statements: AsnType[];
}

/**
 * Represents a query node used to search, retrieve, or match data against a specific pattern.
 *
 * @example
 * // SQL equivalent: SELECT * FROM users WHERE status = 'active'
 *
 * @example
 * // Graph/Pattern matching: MATCH (u:User)-[:OWNS]->(o:Order)
 */
export interface QueryAsn extends IFlowAsn {
  kind: 'QueryAsn';
  pattern: AsnType;
}

/**
 * Represents a constraint node used to enforce rules, assertions, or validations.
 * The pattern describes the invariant or condition that must be satisfied.
 *
 * @example
 * // SQL equivalent: CONSTRAINT check_age CHECK (age >= 18)
 *
 * @example
 * // Rule engine guard: assert(order.totalAmount > 0)
 */
export interface ConstraintAsn extends IFlowAsn {
  kind: 'ConstraintAsn';
  pattern: AsnType;
}

export type FlowAsnType =
  | TernaryAsn
  | IfAsn
  | SwitchAsn
  | DoWhileAsn
  | WhileDoAsn
  | ForIAsn
  | ForOfAsn
  | ForItAsn
  | BlockAsn
  | QueryAsn
  | ConstraintAsn;

// endregion Flow

// region FlowOperator

export interface IIfBranchAsn extends IFlowOperatorAsn {}

export interface ConditionBranchAsn extends IIfBranchAsn {
  kind: 'ConditionBranchAsn';
  pattern: AsnType;
  value: AsnType;
}

export interface ElseBranchAsn extends IIfBranchAsn {
  kind: 'ElseBranchAsn';
  value: AsnType;
}

export type IfBranchAsnType = ConditionBranchAsn | ElseBranchAsn;

export interface ISwitchBranchAsn extends IFlowOperatorAsn {}

export interface MatchBranchAsn extends ISwitchBranchAsn {
  kind: 'MatchBranchAsn';
  pattern: AsnType;
  value: AsnType;
}

export interface DefaultBranchAsn extends ISwitchBranchAsn {
  kind: 'DefaultBranchAsn';
  value: AsnType;
}

export type SwitchBranchAsnType = MatchBranchAsn | DefaultBranchAsn;

/**
 * Represents a return expression.
 * return ...;
 * @final
 */
export interface ReturnAsn extends IFlowOperatorAsn {
  kind: 'ReturnAsn';
  // null - void
  value: abstractions.meta.NullOptional<StateAsnType>;
}

export interface BreakAsn extends IFlowOperatorAsn {
  kind: 'BreakAsn';
  identifier: abstractions.meta.NullOptional<Identifier>;
}

export interface ContinueAsn extends IFlowOperatorAsn {
  kind: 'ContinueAsn';
  identifier: abstractions.meta.NullOptional<Identifier>;
}

export type FlowOperatorAsnType =
  | ConditionBranchAsn
  | ElseBranchAsn
  | MatchBranchAsn
  | DefaultBranchAsn
  | ReturnAsn
  | BlockAsn
  | BreakAsn
  | ContinueAsn;

// endregion FlowOperator

// region Declaration

/**
 * Represents a parameter in a function declaration or signature.
 * @example
 * ```ts
 * (cat: string[]=args,)
 * ```
 * @final
 * @complexity danger use BindingAsn instead
 */
export interface ParameterAsn extends IDeclarationAsn {
  kind: 'ParameterAsn';
  modifiers: ModifierAsnTypes[];
  identifier: Identifier;
  shape: abstractions.meta.NullOptional<AsnType>;
  value: abstractions.meta.NullOptional<StateAsnType>;
}

/**
 * @example
 * ```ts
 * (cat: string[]=args,)=>void
 * ```
 * @final
 */
export interface LambdaAsn extends IDeclarationAsn {
  kind: 'LambdaAsn';
  modifiers: ModifierAsnTypes[];
  parameters: ParameterAsn[];
  returnShape: abstractions.meta.NullOptional<AsnType>;
  block: BlockAsn;
  semanticLayer: SemanticLayer;
}

/**
 * Функция на уровне HIR.
 * @example
 * ```ts
 * a = (x, y) => x + y
 * ```
 * @example
 * "Глагол [передать] требует (Кто:Человек, Что:Предмет, Кому:Человек)."
 */
export interface FunctionAsn extends IDeclarationAsn {
  kind: 'FunctionAsn';
  modifiers: ModifierAsnTypes[];
  identifier: Identifier;
  parameters: ParameterAsn[]; // generics or parameters or shapes
  returnShape: abstractions.meta.NullOptional<AsnType>;
  block: BlockAsn;
}

/**
 * Represents an interface declaration.
 * @example
 * ```rust
 * struct Admin extends User { role: string; }
 * ```
 * @example
 * ```cs
 * record Admin extends User { role: string; }
 * ```
 * @final
 * @complexity danger use ObjectAsn instead
 */
export interface StructAsn extends IDeclarationAsn {
  kind: 'StructAsn';
  identifier: Identifier;
  modifiers: ModifierAsnTypes[];
  parameters: ParameterAsn[];
  properties: PropertyAsn[];
}

/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * interface Admin extends User { role: string; }
 * ```
 * @final
 * @complexity danger syntax sugar use ObjectAsn instead
 */
export interface InterfaceAsn extends IDeclarationAsn {
  kind: 'InterfaceAsn';
  modifiers: ModifierAsnTypes[];
  identifier: Identifier;
  parameters: ParameterAsn[];
  properties: PropertyAsn[];
}

export interface EnumAsn extends IDeclarationAsn {
  kind: 'EnumAsn';
  modifiers: ModifierAsnTypes[];
  identifier: Identifier;
  parameters: ParameterAsn[];
  properties: PropertyAsn[];
}

/**
 * Represents a class declaration.
 * @example
 * ```ts
 * class Admin extends User { role = 'admin'; }
 * ```
 * @final
 * @complexity danger luck of flexibility - dont use,
 * @instead context functions fun f(this:Cat); struct Cat {size:1}
 */
export interface ClassAsn extends IDeclarationAsn {
  kind: 'ClassAsn';
  modifiers: ModifierAsnTypes[];
  identifier: Identifier;
  parameters: ParameterAsn[];
  properties: (PropertyAsn | FunctionAsn)[];
}

/**
 * Represents a module or namespace declaration or file or directory.
 * @example
 * ```ts
 * namespace MyModule { export const x = 1; }
 * ```
 * @final
 * @complexity danger no need use Block instead
 *                    and path import
 *                    and path/location as version
 *                    and runtime as imports
 */
export interface ModuleAsn extends IDeclarationAsn {
  kind: 'ModuleAsn';
  identifier: Identifier;
  block: BlockAsn;
  version: string | null;
  role:
    | 'Program' // has main()
    | 'SourceFile'; // file or dir
}

export type DeclarationAsnType =
  | ParameterAsn
  | StructAsn
  | LambdaAsn
  | FunctionAsn
  | InterfaceAsn
  | EnumAsn
  | ClassAsn
  | ModuleAsn;

// endregion Declaration

// region DeclarationOperator

/**
 *
 *  @complexity danger should be part of engine
 */
export interface AwaitAsn extends IDeclarationOperatorAsn {
  kind: 'AwaitAsn';
  value: StateAsnType;
}

/**
 *
 *  @complexity danger should be part of api
 */
export interface DeleteAsn extends IDeclarationOperatorAsn {
  kind: 'DeleteAsn';
  value: StateAsnType;
}

/**
 *
 *  @complexity danger blocks architecture flexibility
 */
export interface YieldAsn extends IDeclarationOperatorAsn {
  kind: 'YieldAsn';
  value: StateAsnType;
}

export type DeclarationOperatorAsnType = AwaitAsn | DeleteAsn | YieldAsn;

// endregion DeclarationOperator

// region Binding

/**
 * Represents a variable declaration or alias.
 * @example
 * ```ts
 * const myVar: string = "hello";
 * ```
 * @example
 * ```
 * "Комната — это вид хранилища." -> relation: 'subclass'
 * "Библиотека — это комната." -> relation: 'instance'
 * ```
 * @final
 */
export interface InstanceAsn extends IBindingAsn {
  kind: 'InstanceAsn';
  modifiers: ModifierAsnTypes[];
  identifier: Identifier;
  shape: abstractions.meta.NullOptional<AsnType>;
  value: StateAsnType;
}

/**
 * b = a.b ;
 * @final
 */
export interface AliasAsn extends IBindingAsn {
  kind: 'AliasAsn';
  identifier: Identifier;
  value: StateAsnType;
}

/**
 * a = ... ;
 * @final
 */
export interface AssignAsn extends IBindingAsn {
  kind: 'AssignAsn';
  identifier: Identifier;
  value: AsnType;
}

/**
 * Represents an external dependency declaration.
 * @example
 * ```ts
 * import * as abstractions from "@razomy/abstractions";
 * ```
 * @final
 * @complexity danger it should be alias variables `myPkg = npm:My-package:version:relative/path;`
 */

export interface ImportAsn extends IBindingAsn {
  kind: 'ImportAsn';
  identifier: Identifier;
  version: string;
  path: string;
  modifiers: ModifierAsnTypes[];
}

export type BindingAsnType = InstanceAsn | AliasAsn | ImportAsn | AssignAsn;

// endregion Binding

// region Access

/**
 * @final
 * @example
 * ```ts
 * name(1,2) | (1,2)
 * ```
 * @example
 * ```rl
 * "Книга находится на столе" -> predicate: "находится", args: [theme: "Книга", location: "стол"]
 * "Библиотека темная" -> predicate: "темная", args: [theme: "Библиотека"]
 * ```
 */
export interface CallAsn extends IAccessAsn {
  kind: 'CallAsn';
  // null = call()()
  identifier: abstractions.meta.NullOptional<Identifier>;
  arguments_: AsnType[];
}

/**
 * @example
 * .a
 */
export interface MemberAsn extends IAccessAsn {
  kind: 'MemberAsn';
  object_: AsnType;
  property: AsnType;
}

/**
 * @example
 * [1]
 */
export interface ArgumentMemberAsn extends IAccessAsn {
  kind: 'ArgumentMemberAsn';
  argument: AsnType;
  property: AsnType;
}

/**
 * @example
 * a
 */
export interface ReferenceAsn extends IAccessAsn {
  kind: 'ReferenceAsn';
  identifier: Identifier;
}

/**
 * @example
 * ```
 * @Component()
 * ```
 */
export interface DecoratorAsn extends IAccessAsn {
  kind: 'DecoratorAsn';
  identifier: abstractions.meta.NullOptional<Identifier>;
  arguments_: AsnType[];
}

/**
 * Вызов макроса. Обрати внимание, что аргументы могут быть не выражениями,
 * а сырым текстом/токенами, если макрос определяет свой DSL.
 * @example
 * ```rust
 * println!("{}, {}", x, y)`, `vec![1, 2, 3]`
 * ```
 * @complexity danger must be code injection as lang plugin not a virtual code
 */
export interface MacroCallAsn extends IAccessAsn {
  kind: 'MacroCallAsn';
  identifier: Identifier;
  arguments_: abstractions.translator.Token[];
}

export type AccessAsnType = CallAsn | MemberAsn | ArgumentMemberAsn | ReferenceAsn | MacroCallAsn | DecoratorAsn;

// endregion Access

// region Modifier

export interface DependencyModifierAsn extends IModifierAsn {
  kind: 'DependencyModifierAsn';
  operator: 'dependency' | 'peerDependency' | 'runtime';
  value: abstractions.meta.NullOptional<DeclarationAsnType>;
}

export interface AccessModifierAsn extends IModifierAsn {
  kind: 'AccessModifierAsn';
  operator: 'public' | 'private' | 'protected';
  value: abstractions.meta.NullOptional<DeclarationAsnType>;
}

export interface OverrideModifierAsn extends IModifierAsn {
  kind: 'OverrideModifierAsn';
  value: abstractions.meta.NullOptional<DeclarationAsnType>;
}

export interface FunctionModifierAsn extends IModifierAsn {
  kind: 'FunctionModifierAsn';
  operator: 'new' | 'async' | 'generator';
  value: abstractions.meta.NullOptional<DeclarationAsnType>;
}

export interface ParameterModifierAsn extends IModifierAsn {
  kind: 'ParameterModifierAsn';
  operator: 'rest' | 'optional';
  value: abstractions.meta.NullOptional<DeclarationAsnType>;
}

export interface InheritModifierAsn extends IModifierAsn {
  kind: 'InheritModifierAsn';
  operator: 'extent' | 'inherit';
  value: abstractions.meta.NullOptional<DeclarationAsnType>;
}

export interface InstanceModifierAsn extends IModifierAsn {
  kind: 'InstanceModifierAsn';
  operator: 'const' | 'let';
  value: StateAsnType | null;
}

export type ModifierAsnTypes =
  | DependencyModifierAsn
  | AccessModifierAsn
  | OverrideModifierAsn
  | FunctionModifierAsn
  | ParameterModifierAsn
  | InheritModifierAsn
  | InstanceModifierAsn;

// endregion Modifier

// region Layer

export interface CommentAsn extends ILayerAsn {
  kind: 'CommentAsn';
  value: AsnType;
}

export interface DocsAsn extends ILayerAsn {
  kind: 'DocsAsn';
  block: (TextAsn | TagAsn)[];
}

/**
 * {...;}, ()
 * style - readability
 * @final
 */
export interface StyleBlockAsn extends ILayerAsn {
  kind: 'StyleBlockAsn';
  statements: AsnType[];
}

export type LayerAsnTypes = DocsAsn | CommentAsn | StyleBlockAsn;

// endregion Layer

// region LayerOperator
export interface TagAsn extends ILayerAsn {
  kind: 'TagAsn';
  identifier: Identifier;
  value: AsnType;
}

export interface TextAsn extends ILayerAsn {
  kind: 'TextAsn';
  value: AsnType;
}
export type LayerOperatorAsnTypes = TextAsn | TagAsn;
// endregion LayerOperator

export type AsnType =
  | PanicAsnType
  | StateAsnType
  | OperationAsnType
  | FlowAsnType
  | FlowOperatorAsnType
  | DeclarationAsnType
  | DeclarationOperatorAsnType
  | BindingAsnType
  | AccessAsnType
  | ModifierAsnTypes
  | LayerAsnTypes
  | LayerOperatorAsnTypes;
