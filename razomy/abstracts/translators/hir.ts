import * as abstracts from "@razomy/abstracts";
// region Ontology

/**
 * HIR Ontology
 * 0. Panic: Try / Throw
 * 1. State: Literal, Sequence, Record, Template
 * 2. Operation: Unary, Binary, Cast
 * 3. Flow (Logic): Match, Loop, Block
 * 4. FlowOperator: Return, Break, Continue, Yield, MatchArm
 * 5. Declaration: Shape (Struct/Class/Interface), Function (Lambda/Method), Module
 * 6. Binding: Symbol Binding (Const/Alias/Import), Assign
 * 7. Access: Reference, Member, Call
 * 8. Modifier: Capabilities & Qualifiers
 * 9. Layer: Meta, Docs, Annotations
 */

export type SymbolId = number;

/**
 * Базовый узел графа HIR.
 * Каждый узел либо порождает символ, либо привязан к нему.
 * @abstract
 */
export interface IHirNode extends abstracts.domains.IEntity {
  /**
   * @abstract
   */
  kind: string;
  symbolId: SymbolId;
  syntaxLayer: abstracts.translators.SyntaxLayer;
}

/**
 * @abstract
 */
export interface IPanicHir extends IHirNode {}

/**
 * @abstract
 */
export interface IStateHir extends IHirNode {
  semanticLayer: abstracts.translators.SemanticLayer;
}

/**
 * @abstract
 */
export interface IOperationHir extends IHirNode {}

/**
 * @abstract
 */
export interface IFlowHir extends IHirNode {}

/**
 * @abstract
 */
export interface IFlowOperatorHir extends IHirNode {}

/**
 * @abstract
 */
export interface IDeclarationHir extends IHirNode {}

/**
 * @abstract
 */
export interface IBindingHir extends IHirNode {}

/**
 * @abstract
 */
export interface IAccessHir extends IHirNode {}

/**
 * @abstract
 */
export interface IModifierHir extends IHirNode {}

/**
 * @abstract
 */
export interface ILayerHir extends IHirNode {}

// endregion Ontology

// region Panic

/**
 * Унифицированный узел перехвата ошибок.
 * @final
 */
export interface TryCatchHir extends IPanicHir {
  kind: 'TryCatchHir';
  tryBlock: BlockHir;
  catches: Array<{
    errorSymbol: SymbolId;
    condition: abstracts.meta.NullOptional<HirType>;
    block: BlockHir;
  }>;
  finallyBlock: abstracts.meta.NullOptional<BlockHir>;
}

/**
 * Выброс исключения или прерывание выполнения.
 * @final
 */
export interface ThrowHir extends IPanicHir {
  kind: 'ThrowHir';
  value: HirType;
}

export type PanicHirType =
  | TryCatchHir
  | ThrowHir
  ;

// endregion Panic

// region State

/**
 * Примитивные константы (строки, числа, булевы значения, даты).
 * @final
 */
export interface LiteralHir extends IStateHir {
  kind: 'LiteralHir';
  value: any;
}

/**
 * Интерполированная строка или шаблонный литерал.
 * @final
 */
export interface TemplateHir extends IStateHir {
  kind: 'TemplateHir';
  values: HirType[];
}

/**
 * Упорядоченный список значений (объединяет Array и Tuple).
 * @final
 */
export interface SequenceHir extends IStateHir {
  kind: 'SequenceHir';
  elements: HirType[];
}

/**
 * Запись / Структура данных в памяти (объединяет Object и Mapped).
 * @final
 */
export interface ObjectHir extends IStateHir {
  kind: 'ObjectHir';
  entries: Array<{
    key: HirType;
    value: HirType;
  }>;
}

export type StateHirType =
  | LiteralHir
  | TemplateHir
  | SequenceHir
  | ObjectHir
  ;

// endregion State

// region Operation

/**
 * Унарные операции.
 * @final
 */
export interface UnaryHir extends IOperationHir {
  kind: 'UnaryHir';
  operator:
    | '&'
    | '*'
    | '!'
    | '+'
    | '-'
    | '~'
    | '++'
    | '--'
    | 'spread'
  ;
  operand: HirType;
  isPrefix: boolean;
}

/**
 * Бинарные вычисления и сравнения.
 * @final
 */
export interface BinaryHir extends IOperationHir {
  kind: 'BinaryHir';
  operator:
    | '+' | '-' | '*' | '/' | '%' | '**'
    | '&' | '|' | '^' | '<<' | '>>' | '>>>'
    | '==' | '!=' | '===' | '!=='
    | '<' | '<=' | '>' | '>='
    | 'in'
  ;
  left: HirType;
  right: HirType;
}

/**
 * Приведение типов, уточнение шейпа (typeof, as, cast).
 * @final
 */
export interface CastHir extends IOperationHir {
  kind: 'CastHir';
  operator: 'typeof' | 'as' | 'cast';
  targetShape: HirType;
  value: HirType;
}

export type OperationHirType =
  | UnaryHir
  | BinaryHir
  | CastHir
  ;

// endregion Operation

// region Flow

/**
 * Узел сопоставления (объединяет if, switch, ternary).
 * @final
 */
export interface MatchHir extends IFlowHir {
  kind: 'MatchHir';
  target: abstracts.meta.NullOptional<HirType>;
  arms: MatchArmHir[];
}

/**
 * Универсальный цикл (объединяет for, while, do-while, for..in, for..of).
 * @final
 */
export interface LoopHir extends IFlowHir {
  kind: 'LoopHir';
  init: abstracts.meta.NullOptional<HirType>;
  condition: abstracts.meta.NullOptional<HirType>;
  update: abstracts.meta.NullOptional<HirType>;
  block: BlockHir;
  isPostCondition: boolean;
}

/**
 * Блок инструкций со своим скоупом видимости.
 * @final
 */
export interface BlockHir extends IFlowHir {
  kind: 'BlockHir';
  type: 'return' | 'style' | 'value';
  statements: HirType[];
}

export type FlowHirType =
  | MatchHir
  | LoopHir
  | BlockHir
  ;

// endregion Flow

// region FlowOperator

/**
 * Ветка условий для MatchHir (заменяет Case, Default, IfBranch, ElseBranch).
 * @final
 */
export interface MatchArmHir extends IFlowOperatorHir {
  kind: 'MatchArmHir';
  pattern: abstracts.meta.NullOptional<HirType>;
  block: HirType;
}

/**
 * Завершение выполнения блока с возвратом значения.
 * @final
 */
export interface ReturnHir extends IFlowOperatorHir {
  kind: 'ReturnHir';
  value: abstracts.meta.NullOptional<HirType>;
}

/**
 * Прерывание цикла.
 * @final
 */
export interface GoHir extends IFlowOperatorHir {
  kind: 'GoHir';
  type: 'break'| 'continue' | 'yield',
  targetLoopSymbol: abstracts.meta.NullOptional<SymbolId>;
}

/**
 * Приостановка генератора / корутины.
 * @final
 */
export interface YieldHir extends IFlowOperatorHir {
  kind: 'YieldHir';
  value: abstracts.meta.NullOptional<HirType>;
  isDelegate: boolean;
}

export type FlowOperatorHirType =
  | MatchArmHir
  | ReturnHir
  | GoHir
  | YieldHir
  ;

// endregion FlowOperator

// region Declaration

/**
 * Унифицированная функция (объединяет функции, методы, лямбды).
 * @final
 */
export interface FunctionHir extends IDeclarationHir {
  kind: 'FunctionHir';
  identifier: string;
  modifiers: ModifierHir[];
  parameters: BindingHir[];
  returnShape: abstracts.meta.NullOptional<HirType>;
  block: BlockHir;
}

/**
 * Описание формы данных (объединяет Struct, Interface, Class).
 * @final
 */
export interface StructHir extends IDeclarationHir {
  kind: 'StructHir';
  modifiers: ModifierHir[];
  extendsShapes: HirType[];
  fields: Record<string, HirType>;
  methods: FunctionHir[];
}

/**
 * Модуль / Корневой блок компиляции.
 * @final
 */
export interface ModuleHir extends IDeclarationHir {
  kind: 'ModuleHir';
  identifier: string;
  role: 'Program' | 'SourceFile' | 'Root';
  version: string;
  block: BlockHir;
}

export type DeclarationHirType =
  | FunctionHir
  | StructHir
  | ModuleHir
  ;

// endregion Declaration

// region Binding

/**
 * Связывание символа со значением или типом (const, let, type alias, import).
 * @final
 */
export interface BindingHir extends IBindingHir {
  kind: 'BindingHir';
  modifiers: ModifierHir[];
  identifier: string;
  shape: abstracts.meta.NullOptional<HirType>;
  value: abstracts.meta.NullOptional<HirType>;
  externalSource: abstracts.meta.NullOptional<{
    path: string;
    version: string;
  }>;
}

/**
 * Мутация / переприсваивание уже объявленному символу или пути доступа.
 * @final
 */
export interface AssignHir extends IBindingHir {
  kind: 'AssignHir';
  target: IAccessHir;
  value: HirType;
}

export type BindingHirType =
  | BindingHir
  | AssignHir
  ;

// endregion Binding

// region Access

/**
 * Ссылка на идентификатор (Go to definition target).
 * @final
 */
export interface ReferenceHir extends IAccessHir {
  kind: 'ReferenceHir';
  targetSymbol: SymbolId;
}

/**
 * Доступ к члену структуры (объединяет Member .a и Index [x]).
 * @final
 */
export interface MemberHir extends IAccessHir {
  kind: 'MemberHir';
  target: HirType;
  property: HirType;
}

/**
 * Вызов процедуры / макроса / декоратора.
 * @final
 */
export interface CallHir extends IAccessHir {
  kind: 'CallHir';
  callee: HirType;
  arguments_: HirType[];
}

export type AccessHirType =
  | ReferenceHir
  | MemberHir
  | CallHir
  ;

// endregion Access

// region Modifier

/**
 * Модификаторы семантики символов (export, async, static, visibility).
 * @final
 */
export interface ModifierHir extends IModifierHir {
  kind: 'ModifierHir';
  type:
    | 'export'
    | 'override'
    | 'async'
    | 'generator'
    | 'rest'
    | 'optional'
    | 'const'
    | 'mut'
    | 'public'
    | 'private'
  ;
}

export type ModifierHirType =
  | ModifierHir
  ;

// endregion Modifier

// region Layer

/**
 * Документация и аннотации, прикрепленные к символам.
 * @final
 */
export interface LayerHir extends ILayerHir {
  kind: 'LayerHir';
  title: string;
  description: abstracts.meta.NullOptional<string>;
  annotations: Record<string, any>;
}

export type LayerHirType =
  | LayerHir
  ;

// endregion Layer

export type HirType =
  | PanicHirType
  | StateHirType
  | OperationHirType
  | FlowHirType
  | FlowOperatorHirType
  | DeclarationHirType
  | BindingHirType
  | AccessHirType
  | ModifierHirType
  | LayerHirType
  ;
