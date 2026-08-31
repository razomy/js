import * as abstracts from "@razomy/abstracts";

/**
 * Ontology
 * error
 *  0 Panic: try catch
 * data
 *  1 Expression: 42 'a' {a:1}
 * dynamic
 *  2 Operation: + -
 *  3 Logic: 1 or b
 *    4 LogicOperator: break; continue
 * time/structure
 *  5 Declaration: record A{ a:1} function class
 *  6 Bindings: a = 1
 *  7 Access: .method()
 * recursion
 *  8 Meta: Macros, Docs
 *
 * @note
 *  interface, class - костыль
 *  async - костыль
 *  generator - костыль
 *
 * @checklist
 * [] 'kind:name' same as interface Name
 * [] @abstract properties and interfaces and corrent implementation
 * [] no null usage
 * [] single/pural
 * [] property same as Type Base - identifier:Identifier, shapes: Shapes ...
 *    uniq name or opposite names pairs or integration names in one scope - animal, cat | dog, cat1|cat2|cat3
 * [] shape and SemanticLayer - for all value
 * [] strict layer no intersections
 *
 */

// region Ontology

export type AstKey = string;

export type SyntaxLayer =
  | 1 // 'expression' - value code
  | 2 // 'statement' - void code
  | 3 // 'docs' - information code
  | 4 // 'macros' - macros code
  | number

export type SemanticLayer =
  | 1 // 'raw'
  | 2 // 'shape'
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
export interface ExpressionAst extends AstNode {
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
export interface LogicAst extends AstNode {
}

/**
 * @abstract
 */
export interface LogicOperatorAst extends AstNode {
}

/**
 * @abstract
 */
export interface StructureAst extends AstNode {
}

/**
 * @abstract
 */
export interface DeclarationAst extends AstNode {
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

export interface MetaAst extends AstNode {
}

/**
 * @abstract
 */
export type AstOntologyType =
  | PanicAst
  | ExpressionAst
  | OperationAst
  | LogicAst
  | LogicOperatorAst
  | StructureAst
  | BindingAst
  | DeclarationAst
  | AccessAst
  | MetaAst
  ;

// endregion Ontology

/**
 * @final
 */
export interface IdentifierAst extends AstNode {
  kind: 'IdentifierAst';
  name: string;
}

// region Panic

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface TryAst extends PanicAst {
  kind: 'TryAst';
  block: BlockAst;
  catches: CatchAst[];
}

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface CatchAst extends PanicAst {
  kind: 'CatchAst';
  condition: ParameterAst;
  block: BlockAst;
}

/**
 * @final
 * @complexity danger use only for external system error checks
 */
export interface ThrowAst extends PanicAst {
  kind: 'ThrowAst';
  value: ExpressionAstType;
}

export type PanicAstType =
  | CatchAst
  | TryAst
  | ThrowAst;

// endregion Operation

// region Expression

export interface LiteralAst extends ExpressionAst {
  kind: 'LiteralAst';
  semanticLayer: SemanticLayer;
  value: any;
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
export interface TemplateAst extends ExpressionAst {
  kind: 'TemplateAst';
  semanticLayer: SemanticLayer;
  elements: AstType[];
}

/**
 * Represents an array literal containing various expressions.
 * @example
 * ```ts
 * [1, 2, "text"]
 * ```
 * @final
 */
export interface ArrayAst extends ExpressionAst {
  kind: 'ArrayAst';
  semanticLayer: SemanticLayer;
  elements: AstType[];
}

export interface TupleAst extends ExpressionAst {
  kind: 'TupleAst';
  semanticLayer: SemanticLayer;
  elements: AstType[];
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
export interface PropertyAst extends ExpressionAst {
  kind: 'PropertyAst';
  semanticLayer: SemanticLayer;
  identifier: IdentifierAst;
  modifiers: Array<'optional' | 'const'>;
  elements: AstType[];
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
export interface ObjectAst extends ExpressionAst {
  kind: 'ObjectAst';
  semanticLayer: SemanticLayer;
  elements: PropertyAst[];
}

/**
 * Represents a mapped type.
 * @example
 * ```ts
 * { [K in keyof User]: boolean }
 * ```
 * @final
 */
export interface MappedAst extends ExpressionAst {
  kind: 'MappedAst';
  identifier: IdentifierAst;
  constraint: AstType;
  value: ExpressionAstType;
}

export type ExpressionAstType =
  | LiteralAst
  | ArrayAst
  | TupleAst
  | ObjectAst
  | TemplateAst
  | MappedAst
  | PropertyAst;

// endregion Expression

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
    | 'typeof' // Определение типа
    | 'as' // Определение типа
    | 'delete'; // Удаление свойства
  semanticLayer: SemanticLayer;
  value: ExpressionAstType;
  isPrefix: boolean; // true для ++x, false для x++
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
  | BinaryAst
  ;

// endregion Operation

// region Logic
/**
 * @abstract
 */
export interface MatchAst extends LogicAst {
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
export interface LoopAst extends LogicAst {
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

export interface ForInAst extends LoopAst {
  kind: 'ForInAst';
  init: abstracts.meta.NullOptional<AstType>;
  condition: abstracts.meta.NullOptional<AstType>;
  update: abstracts.meta.NullOptional<AstType>;
  block: BlockAst;
}

export interface ForOfAst extends LoopAst {
  kind: 'ForOfAst';
  init: AstType;
  block: BlockAst;
}

export interface ForItAst extends LoopAst {
  kind: 'ForItAst';
  init: abstracts.meta.NullOptional<AstType>;
  condition: abstracts.meta.NullOptional<AstType>;
  update: abstracts.meta.NullOptional<AstType>;
  block: BlockAst;
}

/**
 * @abstract
 */
export interface BlockAst extends LogicAst {
}

/**
 * {...;}, ()
 * return - must use return value
 * @final
 */
export interface BlockExpressionAst extends BlockAst {
  kind: 'BlockExpressionAst';
  statements: AstType[];
}

/**
 * {...;}, ()
 * style - readability
 * @final
 */
export interface BlockStyleAst extends BlockAst {
  kind: 'BlockStyleAst';
  statements: AstType[];
}


/**
 * Represents a block of scoped statements.
 * ()=>{...;}, ()
 * @final
 */
export interface BlockScopeAst extends BlockAst {
  kind: 'BlockScopeAst';
  statements: AstType[];
}

export type LogicAstType =
  | IfAst
  | SwitchAst
  | DoWhileAst
  | WhileDoAst
  | ForInAst
  | ForOfAst
  | ForItAst
  | BlockExpressionAst
  | BlockStyleAst
  | BlockScopeAst
  ;

// endregion Logic

// region LogicOperator

export interface IfBranchAst extends LogicOperatorAst {
  kind: 'IfBranchAst';
  pattern: abstracts.meta.NullOptional<AstType>; // null = else
  value: AstType;
}

export interface SwitchBranchAst extends LogicOperatorAst {
  kind: 'SwitchBranchAst';
  pattern: abstracts.meta.NullOptional<AstType>; // null = default
  value: AstType;
}

/**
 * Represents a return expression.
 * return ...;
 * @final
 */
export interface ReturnAst extends LogicOperatorAst {
  kind: 'ReturnAst';
  // null - void
  value: abstracts.meta.NullOptional<ExpressionAstType>;
}

export interface BreakGoAst extends LogicOperatorAst {
  kind: 'BreakGoAst';
  labelIdentifier: abstracts.meta.NullOptional<IdentifierAst>;
}

export interface ContinueGoAst extends LogicOperatorAst {
  kind: 'ContinueGoAst';
  labelIdentifier: abstracts.meta.NullOptional<IdentifierAst>;
}

export type LogicOperatorAstType =
  | IfBranchAst
  | SwitchBranchAst
  | ReturnAst
  | BlockAst
  | BreakGoAst
  | ContinueGoAst;

// endregion LogicOperator

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
  identifier: IdentifierAst;
  shape: abstracts.meta.NullOptional<AstType>;
  value: abstracts.meta.NullOptional<ExpressionAstType>;
  modifiers: ('rest')[];
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
  block: BlockAst;
  identifier: IdentifierAst;
  generics: abstracts.meta.NullOptional<AstType>[];
  parameters: ParameterAst[];
  returnShape: abstracts.meta.NullOptional<AstType>;
  modifiers: ('async' | 'public' | 'generator')[];
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
  identifier: IdentifierAst;
  extends_: AstType[];
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
  identifier: IdentifierAst;
  extends_: AstType[];
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
  identifier: IdentifierAst;
  extends_: AstType[];
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
  identifier: IdentifierAst;
  block: BlockAst;
  version: string;
  runtime: DependencyAst;
  dependencies: DependencyAst[];
}

export type DeclarationAstType =
  | ParameterAst
  | StructAst
  | FunctionAst
  | InterfaceAst
  | ClassAst
  | ModuleAst
  ;

// endregion Declaration

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
  modifiers: Array<'const'>;
  identifier: IdentifierAst;
  shape: abstracts.meta.NullOptional<AstType>;
  value: ExpressionAstType;
}

/**
 * a = ... ;
 * @final
 */
export interface AliesAst extends BindingAst {
  kind: 'AliesAst';
  identifier: IdentifierAst;
  value: ExpressionAstType;
  modifiers: Array<'const'>;
}

/**
 * a = ... ;
 * @final
 */
export interface AssignAst extends DeclarationAst {
  kind: 'AssignAst';
  identifier: IdentifierAst;
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
export interface DependencyAst extends DeclarationAst {
  kind: 'DependencyAst';
  identifier: IdentifierAst;
  version: string;
  path: string;
}

export type BindingAstType =
  | InstanceAst
  | AliesAst
  | AssignAst
  | DependencyAst

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
  identifier: abstracts.meta.NullOptional<IdentifierAst>;
  modifiers: Array<'spread' | 'async'>;
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
  identifier: IdentifierAst;
  arguments_: abstracts.translators.Token[];
}

/**
 * @example .a | [1]
 */
export interface MemberAst extends AccessAst {
  kind: 'MemberAst';
  object_: AstType;
  property: AstType;
}

export interface ReferenceAst extends AccessAst {
  kind: 'ReferenceAst';
  identifier: IdentifierAst;
  modifiers: Array<'spread' | 'await'>;
}

export type AccessAstType =
  | CallAst
  | MacroCallAst
  | MemberAst
  | ReferenceAst;

// endregion Access

// region Meta

export interface FunctionDocsAst extends MetaAst, abstracts.domains.HasDescription {
  title: string;
  params: Record<string, string>[];
  performance: {
    timeDataSizeComplexityFn: string;
    memoryDataSizeComplexityFn: string;
    history: string[];
  };
  examples: Array<{ code: string; expected: string }>;
}

export type MetaAtTypes = FunctionDocsAst;
// endregion Meta

export type AstType =
  | AstOntologyType
  | PanicAstType
  | ExpressionAstType
  | OperationAstType
  | LogicAstType
  | LogicOperatorAstType
  | DeclarationAstType
  | BindingAstType
  | AccessAstType
  | MetaAtTypes
  ;
