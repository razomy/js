import * as abstracts from "@razomy/abstracts";

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


export interface IHirNode extends abstracts.domains.IEntity, abstracts.graphs.HasOrder<HirType | null>, abstracts.graphs.HasParent<HirType | null> {
  id: string;
  kind: string;
  syntaxLayer: abstracts.translators.SyntaxLayer;
  semanticLayer: abstracts.translators.SemanticLayer;
}

// region Data & Expressions

/**
 * Базовые примитивные значения.
 *
 * @replaces LiteralAst
 */
export interface LiteralHir extends IHirNode {
  kind: 'LiteralHir';
  value: any; // string, number, boolean, null
}

/**
 * Выполнение операций (математика, логика, сравнение, удаление).
 *
 * @replaces UnaryAst - (например, '!', '~', '++') - 1 операнд
 * @replaces BinaryAst - (например, '+', '===') - 2 операнда
 * @replaces SpreadAst - оператор '...' (1 операнд)
 * @replaces ShapingAst - оператор 'typeof', 'as' (1 операнд)
 * @replaces TemplateAst - оператор конкатенации '+' над массивом операндов
 * @replaces AssignAst - оператор '=' (operands[0] - ReferenceHir, operands[1] - значение)
 * @replaces DeleteAst - оператор 'delete' (1 операнд)
 * @replaces QueryAst, ConstraintAst - оператор паттерн-матчинга (например, 'matches' или 'satisfies')
 */
export interface OperatorHir extends IHirNode {
  kind: 'OperatorHir';
  operator: string;
  operands: abstracts.domains.IdRef<HirType>[]; // Массив решает проблему унарных, бинарных и n-арных операций
}

// endregion Data & Expressions

// region Control Flow

/**
 * Последовательность выполнения действий.
 * Возвращает результат выполнения последнего элемента (решает проблему return).
 *
 * @replaces BlockAst
 * @replaces StyleBlockAst - стилизация и блоки `{}` сворачиваются в этот узел
 */
export interface BlockHir extends IHirNode {
  kind: 'BlockHir';
  statements: abstracts.domains.IdRef<HirType>[];
}

/**
 * Универсальное ветвление и перехват исключений.
 *
 * @replaces IfAst - target: boolean, branches: [BranchHir, BranchHir]
 * @replaces SwitchAst - target: выражение, branches: проверки значений
 * @replaces TernaryAst - аналогично IfAst
 * @replaces TryAst - target: OperatorHir (name: 'try', body: SequenceHir), branches обрабатывают catch/finally
 */
export interface MatchHir extends IHirNode {
  kind: 'MatchHir';
  target: abstracts.domains.IdRef<HirType>;
  branches: abstracts.domains.IdRef<BranchHir>[];
}

/**
 * Ветка выполнения внутри MatchHir.
 *
 * @replaces ConditionBranchAst
 * @replaces ElseBranchAst (pattern = true / null)
 * @replaces SwitchBranchAst
 * @replaces MatchBranchAst
 * @replaces DefaultBranchAst (pattern = true / null)
 * @replaces CatchAst, DefaultCatchAst - ветки, где pattern - это ошибка или её тип
 * @replaces FinallyAst - ветка, срабатывающая всегда при выходе из TryAst
 */
export interface BranchHir extends IHirNode {
  kind: 'BranchHir';
  pattern: abstracts.domains.IdRef<HirType>; // Условие срабатывания ветки
  value: abstracts.domains.IdRef<HirType>; // Значение или SequenceHir (блок кода)
}

/**
 * Универсальный цикл.
 *
 * @replaces DoWhileAst, WhileDoAst - condition есть, body есть
 * @replaces ForIAst, ForOfAst, ForItAst - инициализация выносится до цикла, апдейт ставится в конец body
 */
export interface LoopHir extends IHirNode {
  kind: 'LoopHir';
  condition: abstracts.domains.IdRef<HirType> | null; // Если undefined — бесконечный цикл
  block: abstracts.domains.IdRef<BlockHir>; // Тело цикла
}

/**
 * Прерывание потока выполнения (прыжки).
 *
 * @replaces BreakAst - operator: 'break'
 * @replaces ContinueAst - operator: 'continue'
 * @replaces YieldAst - operator: 'yield'
 * @replaces ReturnAst - operator: 'return'
 * @replaces ThrowAst - operator: 'throw'
 */
export interface GoHir extends IHirNode {
  kind: 'GoHir';
  operator: 'break' | 'continue' | 'yield' | 'return' | 'throw';
  value: abstracts.domains.IdRef<HirType> | null; // Возвращаемое значение для yield, return, throw
}

// endregion Control Flow

// region Declarations & Entities

/**
 * Базовый интерфейс для идентификаторов (деклараций).
 *
 * @replaces ModifierAstTypes - ВСЕ модификаторы вынесены в массив (const, let, export, override, async и т.д.)
 * @replaces AsyncAst - превращается в строковый модификатор 'async'
 * @replaces ExportModifierAst, OverrideModifierAst, FunctionModifierAst,
 *           ParameterModifierAst, InheritModifierAst, InstanceModifierAst -> все становятся строками в `modifiers`
 * @replaces MappedAst - уходит в `shape`
 * @replaces ILayerAst (DocsAst, CommentAst, FunctionDocsAst) - уходят в метаданные движка (не являются исполняемым кодом)
 */
export interface IIdentityHir extends IHirNode {
  name: string | null; // Optional: для анонимных сущностей (лямбды, элементы массивов)
  modifiers: abstracts.domains.IdRef<HirType>[]; // 'const', 'export', 'async', 'generator' и т.д.
}

/**
 * Объявление переменных, параметров, свойств объектов.
 *
 * @replaces InstanceAst - (например, let a = 1)
 * @replaces AliasAst
 * @replaces ParameterAst - используется внутри FunctionHir.parameters
 * @replaces PropertyAst - используется внутри StructHir.properties
 */
export interface BindingHir<T extends HirType = abstracts.domains.IdRef<HirType>> extends IIdentityHir {
  kind: 'BindingHir';
  shape: abstracts.domains.IdRef<ReferenceHir> | null; // Type/Interface/Constraint
  value: T | null; // Значение
  description: abstracts.domains.IdRef<LiteralHir> | null;
}

/**
 * Функции и Лямбды.
 *
 * @replaces FunctionAst
 * @replaces LambdaAst - то же самое, но `name: undefined`
 */
export interface FunctionHir extends IIdentityHir {
  kind: 'FunctionHir';
  parameters: abstracts.domains.IdRef<BindingHir>[];
  returnShape: abstracts.domains.IdRef<ReferenceHir> | null;
  block: abstracts.domains.IdRef<HirType> | null;
  title: abstracts.domains.IdRef<LiteralHir> | null;
  description: abstracts.domains.IdRef<LiteralHir> | null;
  examples: abstracts.domains.IdRef<LiteralHir> | null;
}

/**
 * Сложные структуры данных (объекты, классы, массивы, модули).
 *
 * @replaces ObjectAst - свойства описаны в properties (BindingHir)
 * @replaces ArrayAst, TupleAst - properties содержат BindingHir без `name`
 * @replaces StructAst, InterfaceAst, ClassAst, EnumAst
 * @replaces ModuleAst - модуль это просто корневой StructHir
 */
export interface StructHir extends IIdentityHir {
  kind: 'StructHir';
  properties: abstracts.domains.IdRef<HirType>[]; // Поля, методы, элементы массива
}

// endregion Declarations & Entities

// region Access & Interactions

/**
 * Чтение значений, обращение к свойствам, вызовы функций.
 *
 * @replaces ReferenceAst - чтение переменной (target = string, args = undefined)
 * @replaces MemberAst, ArgumentMemberAst - доступ к свойству (target = объект, property = ключ)
 * @replaces CallAst - вызов функции (target = функция, arguments = [...])
 * @replaces ImportAst - системный вызов (например: target = 'require', arguments = ['module_name'])
 * @replaces MacroCallAst, DecoratorAst - разворачиваются в обычный CallHir
 */
export interface ReferenceHir extends IHirNode {
  kind: 'ReferenceHir';
  target: abstracts.domains.IdRef<HirType> | null; // Название переменной ИЛИ узел (например, результат функции)
  property: abstracts.domains.IdRef<HirType> | null; // Для obj.prop или arr[1]
  arguments_: abstracts.domains.IdRef<HirType>[]; // Наличие этого массива (даже []) означает Вызов (Call)
  modifiers: abstracts.domains.IdRef<HirType>[]; // Наличие этого массива (даже []) означает Вызов (Call)
}

// endregion Access & Interactions

/**
 * Итоговое объединение всех доступных узлов Hir.
 */
export type HirType =
  | LiteralHir
  | OperatorHir
  | BlockHir
  | MatchHir
  | BranchHir
  | LoopHir
  | GoHir
  | BindingHir
  | FunctionHir
  | StructHir
  | ReferenceHir;
