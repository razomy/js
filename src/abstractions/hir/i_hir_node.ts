import * as abstractions from '@razomy/abstractions';

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

export interface IHirNode
  extends
    abstractions.patterns.ISyntax,
    abstractions.graph.HasOrder<abstractions.patterns.IdRef<abstractions.hir.IHirNode> | null>,
    abstractions.graph.HasParent<abstractions.patterns.IdRef<abstractions.hir.IHirNode> | null>,
    abstractions.graph.HasChildren<abstractions.patterns.IdRef<abstractions.hir.IHirNode>[]> {
  syntaxRole: abstractions.translator.SyntaxRole;
  semanticLayer: abstractions.translator.SemanticLayer;
}

// region Data & Expressions & FLow

/**
 * Базовые примитивные значения.
 *
 * @replaces LiteralAsn
 */
export interface LiteralHirn extends IHirNode {
  kind: 'LiteralHirn';
  value: any; // string, number, boolean, null
}

/**
 * Выполнение операций (математика, логика, сравнение, удаление).
 *
 * @replaces UnaryAsn - (например, '!', '~', '++') - 1 операнд
 * @replaces BinaryAsn - (например, '+', '===') - 2 операнда
 * @replaces SpreadAsn - оператор '...' (1 операнд)
 * @replaces ShapingAsn - оператор 'typeof', 'as' (1 операнд)
 * @replaces TemplateAsn - оператор конкатенации '+' над массивом операндов
 * @replaces AssignAsn - оператор '=' (operands[0] - ReferenceHirn, operands[1] - значение)
 * @replaces DeleteAsn - оператор 'delete' (1 операнд)
 * @replaces QueryAsn, ConstraintAsn - оператор паттерн-матчинга (например, 'matches' или 'satisfies')
 */
export interface OperatorHirn extends IHirNode {
  kind: 'OperatorHirn';
  operator: string;
  operands: abstractions.patterns.IdRef<HirnType>[]; // Массив решает проблему унарных, бинарных и n-арных операций
}

/**
 * Ветка выполнения внутри MatchHirn.
 *
 * @replaces ConditionBranchAsn
 * @replaces ElseBranchAsn (pattern = true / null)
 * @replaces SwitchBranchAsn
 * @replaces MatchBranchAsn
 * @replaces DefaultBranchAsn (pattern = true / null)
 * @replaces CatchAsn, DefaultCatchAsn - ветки, где pattern - это ошибка или её тип
 * @replaces FinallyAsn - ветка, срабатывающая всегда при выходе из TryAsn
 */
export interface BranchHirn extends IHirNode {
  kind: 'BranchHirn';
  pattern: abstractions.patterns.IdRef<HirnType>; // Условие срабатывания ветки
  value: abstractions.patterns.IdRef<HirnType>; // Значение или SequenceHirn (блок кода)
}

/**
 * Универсальное ветвление и перехват исключений.
 *
 * @replaces IfAsn - target: boolean, branches: [BranchHirn, BranchHirn]
 * @replaces SwitchAsn - target: выражение, branches: проверки значений
 * @replaces TernaryAsn - аналогично IfAsn
 * @replaces TryAsn - target: OperatorHirn (name: 'try', body: SequenceHirn), branches обрабатывают catch/finally
 */
export interface MatchHirn extends IHirNode {
  kind: 'MatchHirn';
  target: abstractions.patterns.IdRef<HirnType>;
  branches: abstractions.patterns.IdRef<BranchHirn>[];
}

/**
 * Прерывание потока выполнения (прыжки).
 *
 * @replaces BreakAsn - operator: 'break'
 * @replaces ContinueAsn - operator: 'continue'
 * @replaces YieldAsn - operator: 'yield'
 * @replaces ReturnAsn - operator: 'return'
 * @replaces ThrowAsn - operator: 'throw'
 */
export interface GoHirn extends IHirNode {
  kind: 'GoHirn';
  operator: 'break' | 'continue' | 'yield' | 'return' | 'throw';
  value: abstractions.patterns.IdRef<HirnType> | null; // Возвращаемое значение для yield, return, throw
}

/**
 * Универсальный цикл.
 *
 * @replaces DoWhileAsn, WhileDoAsn - condition есть, body есть
 * @replaces ForIAsn, ForOfAsn, ForItAsn - инициализация выносится до цикла, апдейт ставится в конец body
 */
export interface LoopHirn extends IHirNode {
  kind: 'LoopHirn';
  condition: abstractions.patterns.IdRef<HirnType> | null; // Если undefined — бесконечный цикл
  block: abstractions.patterns.IdRef<BlockHirn>; // Тело цикла
}

/**
 * Последовательность выполнения действий.
 * Возвращает результат выполнения последнего элемента (решает проблему return).
 *
 * @replaces BlockAsn
 * @replaces StyleBlockAsn - стилизация и блоки `{}` сворачиваются в этот узел
 */
export interface BlockHirn extends IHirNode {
  kind: 'BlockHirn';
  statements: abstractions.patterns.IdRef<HirnType>[];
}

// endregion Control Flow & FLow

// region Declarations & Entities

/**
 * Базовый интерфейс для идентификаторов (деклараций).
 *
 * @replaces ModifierAsnTypes - ВСЕ модификаторы вынесены в массив (const, let, export, override, async и т.д.)
 * @replaces AwaitAsn - превращается в строковый модификатор 'async'
 * @replaces AccessModifierAsn, OverrideModifierAsn, FunctionModifierAsn,
 *           ParameterModifierAsn, InheritModifierAsn, InstanceModifierAsn -> все становятся строками в `modifiers`
 * @replaces MappedAsn - уходит в `shape`
 * @replaces ILayerAsn (DocsAsn, CommentAsn, FunctionDocsAsn) - уходят в метаданные движка (не являются исполняемым кодом)
 */
export interface IIdentityHirn extends IHirNode {
  name: string | null; // Optional: для анонимных сущностей (лямбды, элементы массивов)
  modifiers: abstractions.patterns.IdRef<HirnType>[]; // 'const', 'export', 'async', 'generator' и т.д.
}

/**
 * Объявление переменных, параметров, свойств объектов.
 *
 * @replaces InstanceAsn - (например, let a = 1)
 * @replaces AliasAsn
 * @replaces ParameterAsn - используется внутри FunctionHirn.parameters
 * @replaces PropertyAsn - используется внутри StructHirn.properties
 */
export interface BindingHirn<T extends HirnType = abstractions.patterns.IdRef<HirnType>> extends IIdentityHirn {
  kind: 'BindingHirn';
  shape: abstractions.patterns.IdRef<ReferenceHirn> | null; // Type/Interface/Constraint
  value: T | null; // Значение
  doc: {
    description: string;
  };
}

export interface FunctionDocExampleHirn {
  code: string;
  expected: string;
}

/**
 * Функции и Лямбды.
 *
 * @replaces FunctionAsn
 * @replaces LambdaAsn - то же самое, но `name: undefined`
 */
export interface FunctionHirn extends IIdentityHirn, abstractions.function_.HasFnHashId {
  kind: 'FunctionHirn';
  parameters: abstractions.patterns.IdRef<BindingHirn>[];
  returnShape: abstractions.patterns.IdRef<ReferenceHirn> | null;
  block: abstractions.patterns.IdRef<HirnType> | null;
  doc: {
    title: string | null;
    description: string | null;
    returnDescription: string | null;
    examples: FunctionDocExampleHirn[];
  };
}

/**
 * Сложные структуры данных (объекты, классы, массивы, модули).
 *
 * @replaces ObjectAsn - свойства описаны в properties (BindingHirn)
 * @replaces ArrayAsn, TupleAsn - properties содержат BindingHirn без `name`
 * @replaces StructAsn, InterfaceAsn, ClassAsn, EnumAsn
 */
export interface StructHirn extends IIdentityHirn {
  kind: 'StructHirn';
  properties: abstractions.patterns.IdRef<HirnType>[]; // Поля, методы, элементы массива
  doc: {
    description: string;
  };
}

/**
 * Сложные структуры данных (объекты, классы, массивы, модули).
 *
 * @replaces ModuleAsn - модуль это просто корневой StructHirn
 */
export interface ModuleHirn extends IIdentityHirn {
  kind: 'ModuleHirn';
  properties: abstractions.patterns.IdRef<HirnType>[]; // Поля, методы, элементы массива
  doc: {
    description: string;
  };
}


/**
 * Чтение значений, обращение к свойствам, вызовы функций.
 *
 * @replaces ReferenceAsn - чтение переменной (target = string, args = undefined)
 * @replaces MemberAsn, ArgumentMemberAsn - доступ к свойству (target = объект, property = ключ)
 * @replaces CallAsn - вызов функции (target = функция, arguments = [...])
 * @replaces ImportAsn - системный вызов (например: target = 'require', arguments = ['module_name'])
 * @replaces MacroCallAsn, DecoratorAsn - разворачиваются в обычный CallHirn
 */
export interface ReferenceHirn extends IHirNode {
  kind: 'ReferenceHirn';
  target: abstractions.patterns.IdRef<HirnType> | null; // Название переменной ИЛИ узел (например, результат функции)
  property: abstractions.patterns.IdRef<HirnType> | null; // Для obj.prop или arr[1]
  arguments_: abstractions.patterns.IdRef<HirnType>[]; // Наличие этого массива (даже []) означает Вызов (Call)
}

// endregion Declarations & Entities

/**
 * Итоговое объединение всех доступных узлов Hirn.
 */
export type HirnType =
  | LiteralHirn
  | OperatorHirn
  | BlockHirn
  | MatchHirn
  | BranchHirn
  | LoopHirn
  | GoHirn
  | BindingHirn
  | FunctionHirn
  | ModuleHirn
  | StructHirn
  | ReferenceHirn;

export interface IHirnCtx extends abstractions.patterns.IContext {
  asnRoot: abstractions.translator.AsnType;
  hirRoot: abstractions.hir.HirnType;

  asnToHirn: Map<string, abstractions.patterns.IdRef<abstractions.hir.HirnType>>;
  hirnToAsn: Map<string, abstractions.patterns.IdRef<abstractions.translator.AsnType>>;

  asnMap: Map<string, abstractions.translator.AsnType>;
  hirnMap: Map<string, abstractions.hir.HirnType>;
}
