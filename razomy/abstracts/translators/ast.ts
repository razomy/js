import * as abstracts from "@razomy/abstracts";

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
export interface AstNode {
  /**
   * @abstract
   */
  kind: AstKey;
  syntaxLayer: SyntaxLayer;
}

/**
 * @abstract
 */
export interface PanicAst extends AstNode {
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
export interface StateAst extends AstNode {
}

/**
 * @abstract
 */
export interface OperationAst extends AstNode {
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
export interface FlowAst extends AstNode {
}

/**
 * @abstract
 */
export interface FlowOperatorAst extends AstNode {
}

/**
 * @abstract
 */
export interface DeclarationAst extends AstNode {
}

export interface DeclarationOperatorAst extends AstNode {
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
export interface BindingAst extends AstNode {
}

/**
 * @abstract
 */
export interface AccessAst extends AstNode {
}

export interface ModifierAst extends AstNode {
}

export interface LayerAst extends AstNode {
}

/**
 * @abstract
 */
export type OntologyAstType =
  | PanicAst
  | StateAst
  | OperationAst
  | FlowAst
  | FlowOperatorAst
  | BindingAst
  | DeclarationAst
  | DeclarationOperatorAst
  | AccessAst
  | ModifierAst
  | LayerAst
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
export interface ThrowAst extends PanicAst {
  kind: 'ThrowAst';
  value: StateAstType;
}

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface TryAst extends PanicAst {
  kind: 'TryAst';
  block: BlockAst;
}

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface CatchAst extends PanicAst {
  kind: 'CatchAst';
  condition: AstType;
  block: BlockAst;
}

export interface DefaultCatchAst extends PanicAst {
  kind: 'DefaultCatchAst';
  block: BlockAst;
}

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface FinallyAst extends PanicAst {
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

export interface LiteralAst extends StateAst {
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
export interface TemplateAst extends StateAst {
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
export interface ArrayAst extends StateAst {
  kind: 'ArrayAst';
  semanticLayer: SemanticLayer;
  values: AstType[];
}

export interface TupleAst extends StateAst {
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
export interface PropertyAst extends StateAst {
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
export interface ObjectAst extends StateAst {
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
export interface MappedAst extends StateAst {
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
export interface UnaryAst extends OperationAst {
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


export interface SpreadAst extends OperationAst {
  kind: 'SpreadAst';
  value: StateAstType;
}

export interface ShapingAst extends OperationAst {
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
export interface BinaryAst extends OperationAst {
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
export interface MatchAst extends FlowAst {
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
export interface LoopAst extends FlowAst {
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
export interface BlockAst extends FlowAst {
  kind: 'BlockAst';
  statements: AstType[];
}

export interface QueryAst extends FlowAst {
  pattern: AstType;
}

export interface ConstraintAst extends FlowAst {
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

export interface IfBranchAst extends FlowOperatorAst {
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

export interface SwitchBranchAst extends FlowOperatorAst {
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
export interface ReturnAst extends FlowOperatorAst {
  kind: 'ReturnAst';
  // null - void
  value: abstracts.meta.NullOptional<StateAstType>;
}


export interface BreakAst extends FlowOperatorAst {
  kind: 'BreakAst';
  identifier: abstracts.meta.NullOptional<Identifier>;
}


export interface ContinueAst extends FlowOperatorAst {
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
export interface ParameterAst extends DeclarationAst {
  kind: 'ParameterAst';
  modifiers: ModifierAst[];
  identifier: Identifier;
  shape: abstracts.meta.NullOptional<AstType>;
  value: abstracts.meta.NullOptional<StateAstType>;
}

export interface LambdaAst extends DeclarationAst {
  kind: 'LambdaAst';
  modifiers: ModifierAst[];
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
export interface FunctionAst extends DeclarationAst {
  kind: 'FunctionAst';
  modifiers: ModifierAst[];
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
export interface StructAst extends DeclarationAst {
  kind: 'StructAst';
  identifier: Identifier;
  modifiers: ModifierAst[];
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
export interface InterfaceAst extends DeclarationAst {
  kind: 'InterfaceAst';
  modifiers: ModifierAst[];
  identifier: Identifier;
  parameters: ParameterAst[];
  properties: PropertyAst[];
}

export interface EnumAst extends DeclarationAst {
  kind: 'EnumAst';
  modifiers: ModifierAst[];
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
export interface ClassAst extends DeclarationAst {
  kind: 'ClassAst';
  modifiers: ModifierAst[];
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
export interface ModuleAst extends DeclarationAst {
  kind: 'ModuleAst';
  identifier: Identifier;
  block: BlockAst;
  version: string;
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
export interface AsyncAst extends DeclarationOperatorAst {
  kind: 'AsyncAst';
  value: StateAstType;
}

/**
 *
 *  @complexity danger should be part of api
 */
export interface DeleteAst extends DeclarationOperatorAst {
  kind: 'DeleteAst';
  value: StateAstType;
}

/**
 *
 *  @complexity danger blocks architecture flexibility
 */
export interface YieldAst extends DeclarationOperatorAst {
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
export interface InstanceAst extends BindingAst {
  kind: 'InstanceAst';
  modifiers: ModifierAst[];
  identifier: Identifier;
  shape: abstracts.meta.NullOptional<AstType>;
  value: StateAstType;
}

/**
 * a = ... ;
 * @final
 */
export interface AliasAst extends BindingAst {
  kind: 'AliesAst';
  identifier: Identifier;
  value: StateAstType;
  modifiers: ModifierAst[];
}

/**
 * a = ... ;
 * @final
 */
export interface AssignAst extends BindingAst {
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

export interface ImportAst extends BindingAst {
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
export interface CallAst extends AccessAst {
  kind: 'CallAst';
  // null = call()()
  identifier: abstracts.meta.NullOptional<Identifier>;
  arguments_: AstType[];
}


/**
 * @example .a
 */
export interface MemberAst extends AccessAst {
  kind: 'MemberAst';
  object_: AstType;
  property: AstType;
}

/**
 * @example [1]
 */
export interface ArgumentMemberAst extends AccessAst {
  kind: 'ArgumentMemberAst';
  argument: AstType;
  property: AstType;
}

export interface ReferenceAst extends AccessAst {
  kind: 'ReferenceAst';
  identifier: Identifier;
}

export interface DecoratorAst extends AccessAst {
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
export interface MacroCallAst extends AccessAst {
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


export interface ExportModifierAst extends ModifierAst {
  kind: 'ExportModifierAst';
  value: abstracts.meta.NullOptional<DeclarationAstType>;
}

export interface OverrideModifierAst extends ModifierAst {
  kind: 'OverrideModifierAst';
  value: abstracts.meta.NullOptional<DeclarationAstType>;
}

export interface FunctionModifierAst extends ModifierAst {
  kind: 'FunctionModifierAst';
  operator:
    | 'async'
    | 'generator';
  value: abstracts.meta.NullOptional<DeclarationAstType>;
}

export interface ParameterModifierAst extends ModifierAst {
  kind: 'ParameterModifierAst';
  operator:
    | 'rest'
    | 'optional';
  value: abstracts.meta.NullOptional<DeclarationAstType>;
}

export interface InheritModifierAst extends ModifierAst {
  kind: 'InheritModifierAst';
  operator:
    | 'extent'
    | 'inherit';
  value: abstracts.meta.NullOptional<DeclarationAstType>;
}


export interface InstanceModifierAst extends ModifierAst {
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

export interface DocsAst extends LayerAst, abstracts.domains.HasDescription {
  kind: 'DocsAst';
  title: string;
}

export interface CommentAst extends LayerAst, abstracts.domains.HasDescription {
  kind: 'CommentAst';
}

/**
 * {...;}, ()
 * style - readability
 * @final
 */
export interface StyleBlockAst extends LayerAst {
  kind: 'StyleBlockAst';
  statements: AstType[];
}


export interface FunctionDocsAst extends LayerAst, abstracts.domains.HasDescription {
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
