import * as abstracts from '@razomy/abstracts';

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

export interface IHirNode extends abstracts.patterns.ISyntax {
  syntaxRole: abstracts.translators.SyntaxRole;
  semanticLayer: abstracts.translators.SemanticLayer;
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
  operands: abstracts.patterns.IdRef<HirType>[]; // Массив решает проблему унарных, бинарных и n-арных операций
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
  pattern: abstracts.patterns.IdRef<HirType>; // Условие срабатывания ветки
  value: abstracts.patterns.IdRef<HirType>; // Значение или SequenceHirn (блок кода)
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
  target: abstracts.patterns.IdRef<HirType>;
  branches: abstracts.patterns.IdRef<BranchHirn>[];
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
  value: abstracts.patterns.IdRef<HirType> | null; // Возвращаемое значение для yield, return, throw
}

/**
 * Универсальный цикл.
 *
 * @replaces DoWhileAsn, WhileDoAsn - condition есть, body есть
 * @replaces ForIAsn, ForOfAsn, ForItAsn - инициализация выносится до цикла, апдейт ставится в конец body
 */
export interface LoopHirn extends IHirNode {
  kind: 'LoopHirn';
  condition: abstracts.patterns.IdRef<HirType> | null; // Если undefined — бесконечный цикл
  block: abstracts.patterns.IdRef<BlockHirn>; // Тело цикла
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
  statements: abstracts.patterns.IdRef<HirType>[];
}

// endregion Control Flow & FLow

// region Declarations & Entities

/**
 * Базовый интерфейс для идентификаторов (деклараций).
 *
 * @replaces ModifierAsnTypes - ВСЕ модификаторы вынесены в массив (const, let, export, override, async и т.д.)
 * @replaces AwaitAsn - превращается в строковый модификатор 'async'
 * @replaces ExportModifierAsn, OverrideModifierAsn, FunctionModifierAsn,
 *           ParameterModifierAsn, InheritModifierAsn, InstanceModifierAsn -> все становятся строками в `modifiers`
 * @replaces MappedAsn - уходит в `shape`
 * @replaces ILayerAsn (DocsAsn, CommentAsn, FunctionDocsAsn) - уходят в метаданные движка (не являются исполняемым кодом)
 */
export interface IIdentityHirn extends IHirNode {
  name: string | null; // Optional: для анонимных сущностей (лямбды, элементы массивов)
  modifiers: abstracts.patterns.IdRef<HirType>[]; // 'const', 'export', 'async', 'generator' и т.д.
}

/**
 * Объявление переменных, параметров, свойств объектов.
 *
 * @replaces InstanceAsn - (например, let a = 1)
 * @replaces AliasAsn
 * @replaces ParameterAsn - используется внутри FunctionHirn.parameters
 * @replaces PropertyAsn - используется внутри StructHirn.properties
 */
export interface BindingHirn<T extends HirType = abstracts.patterns.IdRef<HirType>> extends IIdentityHirn {
  kind: 'BindingHirn';
  shape: abstracts.patterns.IdRef<ReferenceHirn> | null; // Type/Interface/Constraint
  value: T | null; // Значение
  doc: {
    description: string;
  };
}

export interface FunctionDocExampleHirn { code: string; expected: string }

/**
 * Функции и Лямбды.
 *
 * @replaces FunctionAsn
 * @replaces LambdaAsn - то же самое, но `name: undefined`
 */
export interface FunctionHirn extends IIdentityHirn, abstracts.functions.HasFnHashId {
  kind: 'FunctionHirn';
  parameters: abstracts.patterns.IdRef<BindingHirn>[];
  returnShape: abstracts.patterns.IdRef<ReferenceHirn> | null;
  block: abstracts.patterns.IdRef<HirType> | null;
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
 * @replaces ModuleAsn - модуль это просто корневой StructHirn
 */
export interface StructHirn extends IIdentityHirn {
  kind: 'StructHirn';
  properties: abstracts.patterns.IdRef<HirType>[]; // Поля, методы, элементы массива
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
  target: abstracts.patterns.IdRef<HirType> | null; // Название переменной ИЛИ узел (например, результат функции)
  property: abstracts.patterns.IdRef<HirType> | null; // Для obj.prop или arr[1]
  arguments_: abstracts.patterns.IdRef<HirType>[]; // Наличие этого массива (даже []) означает Вызов (Call)
}

// endregion Declarations & Entities

/**
 * Итоговое объединение всех доступных узлов Hirn.
 */
export type HirType =
  | LiteralHirn
  | OperatorHirn
  | BlockHirn
  | MatchHirn
  | BranchHirn
  | LoopHirn
  | GoHirn
  | BindingHirn
  | FunctionHirn
  | StructHirn
  | ReferenceHirn;
