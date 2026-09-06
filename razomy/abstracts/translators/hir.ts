import * as abstracts from "@razomy/abstracts";
import type { SemanticLayer, SyntaxLayer } from "./ast";

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
export interface NodeHir {
  /**
   * @abstract
   */
  kind: string;
  symbolId: SymbolId;
  syntaxLayer: SyntaxLayer;
}

/**
 * @abstract
 */
export interface PanicHir extends NodeHir {}

/**
 * @abstract
 */
export interface StateHir extends NodeHir {
  semanticLayer: SemanticLayer;
}

/**
 * @abstract
 */
export interface OperationHir extends NodeHir {}

/**
 * @abstract
 */
export interface FlowHir extends NodeHir {}

/**
 * @abstract
 */
export interface FlowOperatorHir extends NodeHir {}

/**
 * @abstract
 */
export interface DeclarationHir extends NodeHir {}

/**
 * @abstract
 */
export interface BindingHirNode extends NodeHir {}

/**
 * @abstract
 */
export interface AccessHir extends NodeHir {}

/**
 * @abstract
 */
export interface ModifierHir extends NodeHir {}

/**
 * @abstract
 */
export interface LayerHir extends NodeHir {}

// endregion Ontology

// region Panic

/**
 * Унифицированный узел перехвата ошибок.
 * @final
 */
export interface TryCatchHir extends PanicHir {
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
export interface ThrowHir extends PanicHir {
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
export interface LiteralHir extends StateHir {
  kind: 'LiteralHir';
  value: any;
}

/**
 * Интерполированная строка или шаблонный литерал.
 * @final
 */
export interface TemplateHir extends StateHir {
  kind: 'TemplateHir';
  values: HirType[];
}

/**
 * Упорядоченный список значений (объединяет Array и Tuple).
 * @final
 */
export interface SequenceHir extends StateHir {
  kind: 'SequenceHir';
  elements: HirType[];
}

/**
 * Запись / Структура данных в памяти (объединяет Object и Mapped).
 * @final
 */
export interface RecordHir extends StateHir {
  kind: 'RecordHir';
  entries: Array<{
    key: HirType;
    value: HirType;
  }>;
}

export type StateHirType =
  | LiteralHir
  | TemplateHir
  | SequenceHir
  | RecordHir
  ;

// endregion State

// region Operation

/**
 * Унарные операции.
 * @final
 */
export interface UnaryHir extends OperationHir {
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
export interface BinaryHir extends OperationHir {
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
export interface CastHir extends OperationHir {
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
export interface MatchHir extends FlowHir {
  kind: 'MatchHir';
  target: abstracts.meta.NullOptional<HirType>;
  arms: MatchArmHir[];
}

/**
 * Универсальный цикл (объединяет for, while, do-while, for..in, for..of).
 * @final
 */
export interface LoopHir extends FlowHir {
  kind: 'LoopHir';
  init: abstracts.meta.NullOptional<HirType>;
  condition: abstracts.meta.NullOptional<HirType>;
  update: abstracts.meta.NullOptional<HirType>;
  body: BlockHir;
  isPostCondition: boolean;
}

/**
 * Блок инструкций со своим скоупом видимости.
 * @final
 */
export interface BlockHir extends FlowHir {
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
export interface MatchArmHir extends FlowOperatorHir {
  kind: 'MatchArmHir';
  pattern: abstracts.meta.NullOptional<HirType>;
  body: HirType;
}

/**
 * Завершение выполнения блока с возвратом значения.
 * @final
 */
export interface ReturnHir extends FlowOperatorHir {
  kind: 'ReturnHir';
  value: abstracts.meta.NullOptional<HirType>;
}

/**
 * Прерывание цикла.
 * @final
 */
export interface BreakHir extends FlowOperatorHir {
  kind: 'BreakHir';
  targetLoopSymbol: abstracts.meta.NullOptional<SymbolId>;
}

/**
 * Переход на следующую итерацию.
 * @final
 */
export interface ContinueHir extends FlowOperatorHir {
  kind: 'ContinueHir';
  targetLoopSymbol: abstracts.meta.NullOptional<SymbolId>;
}

/**
 * Приостановка генератора / корутины.
 * @final
 */
export interface YieldHir extends FlowOperatorHir {
  kind: 'YieldHir';
  value: abstracts.meta.NullOptional<HirType>;
  isDelegate: boolean;
}

export type FlowOperatorHirType =
  | MatchArmHir
  | ReturnHir
  | BreakHir
  | ContinueHir
  | YieldHir
  ;

// endregion FlowOperator

// region Declaration

/**
 * Параметр сигнатуры функции.
 * @final
 */
export interface ParameterHir extends DeclarationHir {
  kind: 'ParameterHir';
  modifiers: ModifierHir[];
  shape: abstracts.meta.NullOptional<HirType>;
  defaultValue: abstracts.meta.NullOptional<HirType>;
}

/**
 * Унифицированная функция (объединяет функции, методы, лямбды).
 * @final
 */
export interface FunctionHir extends DeclarationHir {
  kind: 'FunctionHir';
  modifiers: ModifierHir[];
  parameters: ParameterHir[];
  returnShape: abstracts.meta.NullOptional<HirType>;
  body: BlockHir;
}

/**
 * Описание формы данных (объединяет Struct, Interface, Class).
 * @final
 */
export interface ShapeDeclarationHir extends DeclarationHir {
  kind: 'ShapeDeclarationHir';
  modifiers: ModifierHir[];
  extendsShapes: HirType[];
  fields: Record<string, HirType>;
  methods: FunctionHir[];
}

/**
 * Модуль / Корневой блок компиляции.
 * @final
 */
export interface ModuleHir extends DeclarationHir {
  kind: 'ModuleHir';
  role: 'Program' | 'SourceFile' | 'Root';
  version: string;
  block: BlockHir;
}

export type DeclarationHirType =
  | ParameterHir
  | FunctionHir
  | ShapeDeclarationHir
  | ModuleHir
  ;

// endregion Declaration

// region Binding

/**
 * Связывание символа со значением или типом (const, let, type alias, import).
 * @final
 */
export interface BindingHir extends BindingHirNode {
  kind: 'BindingHir';
  modifiers: ModifierHir[];
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
export interface AssignHir extends BindingHirNode {
  kind: 'AssignHir';
  target: AccessHir;
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
export interface ReferenceHir extends AccessHir {
  kind: 'ReferenceHir';
  targetSymbol: SymbolId;
}

/**
 * Доступ к члену структуры (объединяет Member .a и Index [x]).
 * @final
 */
export interface MemberHir extends AccessHir {
  kind: 'MemberHir';
  target: HirType;
  property: HirType;
}

/**
 * Вызов процедуры / макроса / декоратора.
 * @final
 */
export interface CallHir extends AccessHir {
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
export interface AttributeModifierHir extends ModifierHir {
  kind: 'AttributeModifierHir';
  name:
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
  | AttributeModifierHir
  ;

// endregion Modifier

// region Layer

/**
 * Документация и аннотации, прикрепленные к символам.
 * @final
 */
export interface MetaLayerHir extends LayerHir {
  kind: 'MetaLayerHir';
  title: string;
  description: abstracts.meta.NullOptional<string>;
  annotations: Record<string, any>;
}

export type LayerHirType =
  | MetaLayerHir
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
