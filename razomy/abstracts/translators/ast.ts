import * as abstracts from "@razomy/abstracts";
import type {IEntity} from "@razomy/abstracts/domains";

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
 *     DeclarationOperatorAst
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

export type AstKey = string;

export type SyntaxLayer =
  | 1 // 'docs' - information code
  | 2 // 'expression' - value code
  | 3 // 'statement' - void(future) code
  | 4 // 'macros' - macros code
  | number

export type SemanticLayer =
  | 1 // 'raw'
  | 2 // 'shape'
  | 3 // 'generic'
  | number
  ;

/**
 * The foundational interface for all AST nodes.
 * @abstract
 */
export interface IAstNode extends IEntity {
  /**
   * @abstract
   */
  kind: AstKey;
  syntaxLayer: SyntaxLayer;
}

/**
 * @abstract
 */
export interface IPanicAst extends IAstNode {
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
export interface IStateAst extends IAstNode {
}

/**
 * @abstract
 */
export interface IOperationAst extends IAstNode {
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
export interface IFlowAst extends IAstNode {
}

/**
 * @abstract
 */
export interface IFlowOperatorAst extends IAstNode {
}

/**
 * @abstract
 */
export interface IDeclarationAst extends IAstNode {
}

export interface IDeclarationOperatorAst extends IAstNode {
}

/**
 * Base interface for all declarations.
 * Represents creating an entity with a specific name and state.
 * Request memory
 * @example
 * ```ts
 * * Identifier with Ast assignment
 * `const x:number` or `interface User {}`
 * ```
 * @abstract
 */
export interface IBindingAst extends IAstNode {
}

/**
 * @abstract
 */
export interface IAccessAst extends IAstNode {
}

export interface IModifierAst extends IAstNode {
}

export interface ILayerAst extends IAstNode {
}

/**
 * @abstract
 */
export type OntologyAstType =
  | IPanicAst
  | IStateAst
  | IOperationAst
  | IFlowAst
  | IFlowOperatorAst
  | IBindingAst
  | IDeclarationAst
  | IDeclarationOperatorAst
  | IAccessAst
  | IModifierAst
  | ILayerAst
  ;

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
export interface ThrowAst extends IPanicAst {
  kind: 'ThrowAst';
  value: StateAstType;
}

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface TryAst extends IPanicAst {
  kind: 'TryAst';
  block: BlockAst;
}

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface CatchAst extends IPanicAst {
  kind: 'CatchAst';
  condition: AstType;
  block: BlockAst;
}

export interface DefaultCatchAst extends IPanicAst {
  kind: 'DefaultCatchAst';
  block: BlockAst;
}

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface FinallyAst extends IPanicAst {
  kind: 'FinallyAst';
  value: StateAstType;
}

export type PanicAstType =
  | CatchAst
  | DefaultCatchAst
  | TryAst
  | ThrowAst
  | FinallyAst
  ;

// endregion Panic

// region State

export interface LiteralAst extends IStateAst {
  kind: 'LiteralAst';
  semanticLayer: SemanticLayer; // 1
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
export interface TemplateAst extends IStateAst {
  kind: 'TemplateAst';
  semanticLayer: SemanticLayer;
  values: AstType[];
}

/**
 * Represents an array literal containing various expressions.
 * @example
 * ```ts
 * [1, 2, "text"]
 * ```
 * @final
 */
export interface ArrayAst extends IStateAst {
  kind: 'ArrayAst';
  semanticLayer: SemanticLayer;
  values: AstType[];
}

export interface TupleAst extends IStateAst {
  kind: 'TupleAst';
  semanticLayer: SemanticLayer;
  values: AstType[];
}

/**
 * Represents a property inside an object literal value.
 * @example
 * ```ts
 * name: "John" inside { name: "John" }
 * ```
 * @final
 * @complexity danger use BindingAst instead
 */
export interface PropertyAst extends IStateAst {
  kind: 'PropertyAst';
  semanticLayer: SemanticLayer;
  identifier: Identifier;
  value: AstType;
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
export interface ObjectAst extends IStateAst {
  kind: 'ObjectAst';
  semanticLayer: SemanticLayer;
  properties: PropertyAst[];
}

/**
 * Represents a mapped type.
 * @example
 * ```ts
 * { [K in keyof User]: boolean }
 * ```
 * @final
 */
export interface MappedAst extends IStateAst {
  kind: 'MappedAst';
  semanticLayer: SemanticLayer;
  constraint: AstType;
  value: StateAstType;
}

export type StateAstType =
  | LiteralAst
  | ArrayAst
  | TupleAst
  | ObjectAst
  | TemplateAst
  | MappedAst
  | PropertyAst
  ;

// endregion State

// region Operation

/**
 * Унарные операции: !1, ++1, x--, -5, +x, ~2, typeof x, delete x
 * @final
 */
export interface UnaryAst extends IOperationAst {
  kind: 'UnaryAst';
  operator:
    | '&' // AddressOfAst
    | '*' // DereferenceAst
    | '!' // Логическое НЕ
    | '+' // Унарный плюс (приведение к числу)
    | '-' // Унарный минус (отрицание)
    | '~' // Побитовое НЕ
    | '++' // Инкремент
    | '--' // Декремент
  ;
  value: StateAstType;
  isPrefix: boolean; // true для ++x, false для x++
}


export interface SpreadAst extends IOperationAst {
  kind: 'SpreadAst';
  value: StateAstType;
}

export interface ShapingAst extends IOperationAst {
  kind: 'ShapingAst';
  operator:
    | 'typeof'
    | 'as'
    | '(parenting)';
  semanticLayer: SemanticLayer;
  value: StateAstType;
}

/**
 * Бинарные операции: 1 + 1, 3 & 4, x === y, a ** b
 * @final
 */
export interface BinaryAst extends IOperationAst {
  kind: 'BinaryAst';
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
  left: AstType;
  right: AstType;
}


export type OperationAstType =
  | UnaryAst
  | SpreadAst
  | ShapingAst
  | BinaryAst
  ;

// endregion Operation

// region Flow
/**
 * @abstract
 */
export interface MatchAst extends IFlowAst {
}

export interface TernaryAst extends MatchAst {
  kind: 'TernaryAst';
  branches: IfBranchAst[];
}

export interface IfAst extends MatchAst {
  kind: 'IfAst';
  branches: IfBranchAst[];
}

export interface SwitchAst extends MatchAst {
  kind: 'SwitchAst';
  target: AstType;
  branches: SwitchBranchAst[];
}

/**
 * @abstract
 */
export interface LoopAst extends IFlowAst {
}

export interface DoWhileAst extends LoopAst {
  kind: 'DoWhileAst';
  condition: AstType;
  block: BlockAst;
}

export interface WhileDoAst extends LoopAst {
  kind: 'WhileDoAst';
  condition: AstType;
  block: BlockAst;
}

/**
 * Iterate
 */
export interface ForIAst extends LoopAst {
  kind: 'ForInAst';
  init: abstracts.meta.NullOptional<AstType>;
  condition: abstracts.meta.NullOptional<AstType>;
  update: abstracts.meta.NullOptional<AstType>;
  block: BlockAst;
}

/**
 * Array
 */
export interface ForOfAst extends LoopAst {
  kind: 'ForOfAst';
  init: AstType;
  block: BlockAst;
}

/**
 * Object
 */
export interface ForItAst extends LoopAst {
  kind: 'ForItAst';
  init: abstracts.meta.NullOptional<AstType>;
  condition: abstracts.meta.NullOptional<AstType>;
  update: abstracts.meta.NullOptional<AstType>;
  block: BlockAst;
}

/**
 * Represents a block of scoped statements.
 * @example
 * ()=>{...;}
 * {...;}, () - return - must use return value
 * @final
 */
export interface BlockAst extends IFlowAst {
  kind: 'BlockAst';
  statements: AstType[];
}

export interface QueryAst extends IFlowAst {
  pattern: AstType;
}

export interface ConstraintAst extends IFlowAst {
  pattern: AstType;
}

export type FlowAstType =
  | TernaryAst
  | IfAst
  | SwitchAst
  | DoWhileAst
  | WhileDoAst
  | ForIAst
  | ForOfAst
  | ForItAst
  | BlockAst
  | QueryAst
  | ConstraintAst
  ;

// endregion Flow

// region FlowOperator

export interface IfBranchAst extends IFlowOperatorAst {
}

export interface ConditionBranchAst extends IfBranchAst {
  kind: 'ConditionBranchAst';
  pattern: AstType;
  value: AstType;
}

export interface ElseBranchAst extends IfBranchAst {
  kind: 'ElseBranchAst';
  value: AstType;
}

export interface SwitchBranchAst extends IFlowOperatorAst {
}

export interface MatchBranchAst extends SwitchBranchAst {
  kind: 'SwitchBranchAst';
  pattern: AstType;
  value: AstType;
}


export interface DefaultBranchAst extends SwitchBranchAst {
  kind: 'DefaultBranchAst';
  value: AstType;
}

/**
 * Represents a return expression.
 * return ...;
 * @final
 */
export interface ReturnAst extends IFlowOperatorAst {
  kind: 'ReturnAst';
  // null - void
  value: abstracts.meta.NullOptional<StateAstType>;
}


export interface BreakAst extends IFlowOperatorAst {
  kind: 'BreakAst';
  identifier: abstracts.meta.NullOptional<Identifier>;
}


export interface ContinueAst extends IFlowOperatorAst {
  kind: 'ContinueAst';
  identifier: abstracts.meta.NullOptional<Identifier>;
}

export type FlowOperatorAstType =
  | ConditionBranchAst
  | ElseBranchAst
  | SwitchBranchAst
  | MatchBranchAst
  | DefaultBranchAst
  | ReturnAst
  | BlockAst
  | BreakAst
  | ContinueAst
  ;

// endregion FlowOperator

// region Declaration

/**
 * Represents a parameter in a function declaration or signature.
 * @example
 * ```ts
 * (cat=args: string[],)
 * ```
 * @final
 * @complexity danger use BindingAst instead
 */
export interface ParameterAst extends IDeclarationAst {
  kind: 'ParameterAst';
  modifiers: ModifierAstTypes[];
  identifier: Identifier;
  shape: abstracts.meta.NullOptional<AstType>;
  value: abstracts.meta.NullOptional<StateAstType>;
}

export interface LambdaAst extends IDeclarationAst {
  kind: 'LambdaAst';
  modifiers: ModifierAstTypes[];
  parameters: ParameterAst[];
  returnShape: abstracts.meta.NullOptional<AstType>;
  block: BlockAst;
}

/**
 * Функция на уровне HIR.
 * @example
 * ```ts
 * \`(x, y) => x + y\` (где x и y имеют свои SymbolId).
 * ```
 * @example
 * "Глагол [передать] требует (Кто:Человек, Что:Предмет, Кому:Человек)."
 */
export interface FunctionAst extends IDeclarationAst {
  kind: 'FunctionAst';
  modifiers: ModifierAstTypes[];
  identifier: Identifier;
  parameters: ParameterAst[]; // generics or parameters or shapes
  returnShape: abstracts.meta.NullOptional<AstType>;
  block: BlockAst;
}

/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * struct Admin extends User { role: string; }
 * ```
 * @final
 * @complexity danger use ObjectAst instead
 */
export interface StructAst extends IDeclarationAst {
  kind: 'StructAst';
  identifier: Identifier;
  modifiers: ModifierAstTypes[];
  parameters: ParameterAst[];
  properties: PropertyAst[];
}

/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * interface Admin extends User { role: string; }
 * ```
 * @final
 * @complexity danger syntax sugar use ObjectAst instead
 */
export interface InterfaceAst extends IDeclarationAst {
  kind: 'InterfaceAst';
  modifiers: ModifierAstTypes[];
  identifier: Identifier;
  parameters: ParameterAst[];
  properties: PropertyAst[];
}

export interface EnumAst extends IDeclarationAst {
  kind: 'EnumAst';
  modifiers: ModifierAstTypes[];
  identifier: Identifier;
  parameters: ParameterAst[];
  properties: PropertyAst[];
}


/**
 * Represents an interface declaration.
 * @example
 * ```ts
 * interface Admin extends User { role: string; }
 * ```
 * @final
 * @complexity danger luck of flexibility - dont use
 */
export interface ClassAst extends IDeclarationAst {
  kind: 'ClassAst';
  modifiers: ModifierAstTypes[];
  identifier: Identifier;
  parameters: ParameterAst[];
  properties: PropertyAst[];
  methods: FunctionAst[];
}

/**
 * Represents a module or namespace declaration.
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
export interface ModuleAst extends IDeclarationAst {
  kind: 'ModuleAst';
  identifier: Identifier;
  block: BlockAst;
  version: string | null;
  runtime: ImportAst;
  role: 'Program' | 'SourceFile' | 'Root'
  dependencies: ImportAst[];
}

export type DeclarationAstType =
  | ParameterAst
  | StructAst
  | LambdaAst
  | FunctionAst
  | InterfaceAst
  | EnumAst
  | ClassAst
  | ModuleAst
  ;

// endregion Declaration

// region DeclarationOperator

/**
 *
 *  @complexity danger should be part of engine
 */
export interface AsyncAst extends IDeclarationOperatorAst {
  kind: 'AsyncAst';
  value: StateAstType;
}

/**
 *
 *  @complexity danger should be part of api
 */
export interface DeleteAst extends IDeclarationOperatorAst {
  kind: 'DeleteAst';
  value: StateAstType;
}

/**
 *
 *  @complexity danger blocks architecture flexibility
 */
export interface YieldAst extends IDeclarationOperatorAst {
  kind: 'YieldAst';
  value: StateAstType;
}

export type DeclarationOperatorAstType =
  | AsyncAst
  | DeleteAst
  | YieldAst

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
export interface InstanceAst extends IBindingAst {
  kind: 'InstanceAst';
  modifiers: ModifierAstTypes[];
  identifier: Identifier;
  shape: abstracts.meta.NullOptional<AstType>;
  value: StateAstType;
}

/**
 * a = ... ;
 * @final
 */
export interface AliasAst extends IBindingAst {
  kind: 'AliasAst';
  identifier: Identifier;
  value: StateAstType;
  modifiers: ModifierAstTypes[];
}

/**
 * a = ... ;
 * @final
 */
export interface AssignAst extends IBindingAst {
  kind: 'AssignAst';
  identifier: Identifier;
  value: AstType;
}

/**
 * Represents an external dependency declaration.
 * @example
 * ```ts
 * import * as abstracts from "@razomy/abstracts";
 * ```
 * @final
 * @complexity danger it should be alias variables `myPkg = npm:My-package:version:relative/path;`
 */

export interface ImportAst extends IBindingAst {
  kind: 'ImportAst';
  identifier: Identifier;
  version: string;
  path: string;
}

export type BindingAstType =
  | InstanceAst
  | AliasAst
  | ImportAst
  | AssignAst

// endregion Binding

// region Access

/** name(1,2) | (1,2)
 * @final
 * @example
 * "Книга находится на столе" -> predicate: "находится", args: [theme: "Книга", location: "стол"]
 * "Библиотека темная" -> predicate: "темная", args: [theme: "Библиотека"]
 */
export interface CallAst extends IAccessAst {
  kind: 'CallAst';
  // null = call()()
  identifier: abstracts.meta.NullOptional<Identifier>;
  arguments_: AstType[];
}

/**
 * @example .a
 */
export interface MemberAst extends IAccessAst {
  kind: 'MemberAst';
  object_: AstType;
  property: AstType;
}

/**
 * @example [1]
 */
export interface ArgumentMemberAst extends IAccessAst {
  kind: 'ArgumentMemberAst';
  argument: AstType;
  property: AstType;
}

export interface ReferenceAst extends IAccessAst {
  kind: 'ReferenceAst';
  identifier: Identifier;
}

export interface DecoratorAst extends IAccessAst {
  kind: 'DecoratorAst';
  identifier: abstracts.meta.NullOptional<Identifier>;
  arguments_: AstType[];
}

/**
 * Вызов макроса. Обрати внимание, что аргументы могут быть не выражениями,
 * а сырым текстом/токенами, если макрос определяет свой DSL.
 * @example Rust: `println!("{}, {}", x, y)`, `vec![1, 2, 3]`
 * @complexity danger must be code injection as lang plugin not a virtual code
 */
export interface MacroCallAst extends IAccessAst {
  kind: 'MacroCallAst';
  identifier: Identifier;
  arguments_: abstracts.translators.Token[];
}

export type AccessAstType =
  | CallAst
  | MemberAst
  | ArgumentMemberAst
  | ReferenceAst
  | MacroCallAst
  | DecoratorAst
  ;

// endregion Access

// region Modifier

export interface ExportModifierAst extends IModifierAst {
  kind: 'ExportModifierAst';
  value: abstracts.meta.NullOptional<DeclarationAstType>;
}

export interface OverrideModifierAst extends IModifierAst {
  kind: 'OverrideModifierAst';
  value: abstracts.meta.NullOptional<DeclarationAstType>;
}

export interface FunctionModifierAst extends IModifierAst {
  kind: 'FunctionModifierAst';
  operator:
    | 'async'
    | 'generator';
  value: abstracts.meta.NullOptional<DeclarationAstType>;
}

export interface ParameterModifierAst extends IModifierAst {
  kind: 'ParameterModifierAst';
  operator:
    | 'rest'
    | 'optional';
  value: abstracts.meta.NullOptional<DeclarationAstType>;
}

export interface InheritModifierAst extends IModifierAst {
  kind: 'InheritModifierAst';
  operator:
    | 'extent'
    | 'inherit';
  value: abstracts.meta.NullOptional<DeclarationAstType>;
}

export interface InstanceModifierAst extends IModifierAst {
  kind: 'InstanceModifierAst';
  operator:
    | 'const'
    | 'let';
  value: StateAstType | null;
}

export type ModifierAstTypes =
  | ExportModifierAst
  | OverrideModifierAst
  | FunctionModifierAst
  | ParameterModifierAst
  | InheritModifierAst
  | InstanceModifierAst

// endregion Modifier

// region Layer

export interface DocsAst extends ILayerAst, abstracts.domains.HasDescription {
  kind: 'DocsAst';
  title: string;
}

export interface CommentAst extends ILayerAst, abstracts.domains.HasDescription {
  kind: 'CommentAst';
}

/**
 * {...;}, ()
 * style - readability
 * @final
 */
export interface StyleBlockAst extends ILayerAst {
  kind: 'StyleBlockAst';
  statements: AstType[];
}

export interface FunctionDocsAst extends ILayerAst, abstracts.domains.HasDescription {
  kind: 'FunctionDocsAst';
  title: string;
  parameters: Record<string, string>;
  performance: {
    timeDataSizeComplexityFn: string;
    memoryDataSizeComplexityFn: string;
    history: string[];
  };
  examples: { code: string; expected: string }[];
}

export type LayerAstTypes =
  | DocsAst
  | CommentAst
  | FunctionDocsAst
  | StyleBlockAst
  ;

// endregion Layer

export type AstType =
  | OntologyAstType
  | PanicAstType
  | StateAstType
  | OperationAstType
  | FlowAstType
  | FlowOperatorAstType
  | DeclarationAstType
  | DeclarationOperatorAstType
  | BindingAstType
  | AccessAstType
  | ModifierAstTypes
  | LayerAstTypes
  ;
