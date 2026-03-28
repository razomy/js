import type {Span} from "./token";

// ==========================================
// СЛОЙ 2: HIR (High-Level IR / Семантика / Смыслы)
// Строк больше нет! Все имена превратились в Уникальные ID (Символы).
// Здесь раскрываются импорты и интерфейсы. Это слой для IDE (LSP).
// ==========================================

export type SymbolId = number; // Уникальный ID переменной/типа во всем проекте

export interface HirNode {
  kind: string;
  span: Span;
  symbolId: SymbolId; // Кэш вычисленного типа (для IDE)
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
