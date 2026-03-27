import type { Span } from "./token";

// ==========================================
// СЛОЙ 3: Core AST (Математическое Ядро - Calculus of Constructions)
// Символы исчезают! Интерфейсы исчезают! Дженерики исчезают!
// Остаются только индексы де Брёйна, Лямбды и зависимые типы.
// ==========================================

export interface CoreNode {
  kind: string;
}

/**
 * Тип для самих типов (Universe hierarchy).
 * @example
 * ```ts
 * \`typeof Object\` or \`Type\`
 * // Universe(0) = Type, Universe(1) = Kind
 * ```
 */
export interface CoreUniverseTerm extends CoreNode {
  kind: 'CoreUniverseTerm';
  level: number;
}

/**
 * Локальная переменная, использующая индексы де Брёйна (никаких имен).
 * @example
 * ```ts
 * In \`x => x\`, the inner \`x\` is \`CoreVariableTerm\` with index 0.
 * ```
 */
export interface CoreVariableTerm extends CoreNode {
  kind: 'CoreVariableTerm';
  index: number; 
}

/**
 * Блок связывания (Let-binding), может быть рекурсивным.
 * Заменяет все константы и функции в области видимости.
 * @example
 * ```ts
 * \`const f = () => f();\`
 * ```
 */
export interface CoreLetTerm extends CoreNode {
  kind: 'CoreLetTerm';
  isRecursive: boolean;
  typeAnnotation: CoreTerm;
  value: CoreTerm;
  body: CoreTerm;
}

/**
 * Зависимый тип функции (Контракт / Pi-тип).
 * Позволяет типам зависеть от значений параметров. Заменяет дженерики.
 * @example
 * ```ts
 * \`<T>(x: T) => U<T>\` - contract of a function.
 * ```
 */
export interface CorePiTerm extends CoreNode {
  kind: 'CorePiTerm';
  paramType: CoreTerm;
  bodyType: CoreTerm; 
}

/**
 * Исполняемый код функции (Lambda).
 * @example
 * ```ts
 * \`x => x + 1\`
 * ```
 */
export interface CoreLambdaTerm extends CoreNode {
  kind: 'CoreLambdaTerm';
  body: CoreTerm;
}

/**
 * Применение функции (вызов).
 * @example
 * ```ts
 * \`f(x)\`
 * ```
 */
export interface CoreApplyTerm extends CoreNode {
  kind: 'CoreApplyTerm';
  callee: CoreTerm;
  arg: CoreTerm; // Строго 1 аргумент (каррирование)
}

/**
 * Идеальная структура данных: словарь/запись.
 * Заменяет Классы, Объекты, Модули и Пространства имен.
 * @example
 * ```ts
 * \`{ a: 1, b: "test" }\`
 * ```
 */
export interface CoreRecordTerm extends CoreNode {
  kind: 'CoreRecordTerm';
  fields: Map<string, CoreTerm>; 
}

/**
 * Чтение поля из Record (Projection).
 * @example
 * ```ts
 * \`obj.field\`
 * ```
 */
export interface CoreProjectTerm extends CoreNode {
  kind: 'CoreProjectTerm';
  target: CoreTerm;
  field: string;
}

/**
 * Математическое ветвление на уровне ядра (Pattern Matching).
 * @example
 * ```ts
 * Ветвления, как if/else или switch, но на уровне типов/значений.
 * ```
 */
export interface CoreMatchTerm extends CoreNode {
  kind: 'CoreMatchTerm';
  target: CoreTerm;
  cases: Array<{ pattern: CoreTerm; body: CoreTerm }>;
}

/**
 * Вызов системных или встроенных функций. Связь с "грязным миром".
 * @example
 * ```ts
 * internal JS engine operations like numeric addition \`+\` or syscalls \`console.log\`.
 * ```
 */
export interface CoreIntrinsicTerm extends CoreNode {
  kind: 'CoreIntrinsicTerm';
  op: 'Syscall' | 'Malloc' | 'Add' | 'Mul' | 'Print' | 'ReadFile'; 
  args: CoreTerm[];
}

export type CoreTerm =
  | CoreUniverseTerm
  | CoreVariableTerm
  | CoreLetTerm
  | CorePiTerm
  | CoreLambdaTerm
  | CoreApplyTerm
  | CoreRecordTerm
  | CoreProjectTerm
  | CoreMatchTerm
  | CoreIntrinsicTerm;

// ==========================================
// СЛОЙ 2: HIR (High-Level IR / Семантика / Смыслы)
// Строк больше нет! Все имена превратились в Уникальные ID (Символы).
// Здесь раскрываются импорты и интерфейсы. Это слой для IDE (LSP).
// ==========================================

export type SymbolId = number; // Уникальный ID переменной/типа во всем проекте

export interface HirNode {
  kind: string;
  span: Span;
  resolvedType?: SymbolId; // Кэш вычисленного типа (для IDE)
}

/**
 * Определение, связывающее SymbolId со значением.
 * В HIR разница между 'type' и 'const' стирается.
 * @example
 * ```ts
 * \`const x = 1;\` или \`type X = number;\` (связывает уникальный ID с выражением).
 * ```
 */
export interface HirBinding extends HirNode {
  kind: 'HirBinding';
  symbol: SymbolId;        
  isTypeLevel: boolean;  // true для type/interface, false для const/let
  value: HirExpression;
}

/**
 * Использование переменной. IDE использует это для "Go to Definition".
 * @example
 * ```ts
 * \`console.log(x)\` -> \`x\` здесь это HirReference.
 * ```
 */
export interface HirReference extends HirNode {
  kind: 'HirReference';
  target: SymbolId; // Строгая ссылка на объявление!
}

/**
 * Функция на уровне HIR.
 * @example
 * ```ts
 * \`(x, y) => x + y\` (где x и y имеют свои SymbolId).
 * ```
 */
export interface HirFunction extends HirNode {
  kind: 'HirFunction';
  params: SymbolId[];
  body: HirExpression;
}

/**
 * Вызов функции на уровне HIR.
 * @example
 * ```ts
 * \`f(1, 2)\`
 * ```
 */
export interface HirCall extends HirNode {
  kind: 'HirCall';
  callee: HirExpression;
  args: HirExpression[];
}

export type HirExpression =
  | HirReference
  | HirFunction
  | HirCall;
