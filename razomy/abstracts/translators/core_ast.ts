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

