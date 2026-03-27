// ==========================================
// ДВИЖОК КОМПИЛЯТОРА: Тайпчекер
// Работает ТОЛЬКО со слоем 3 (Core AST).
// ==========================================

import type {CoreTerm} from "./core_ast";

export interface TypeChecker {
  /**
   * Узнать тип снизу-вверх
   * @example
   * ```ts
   * Выводит тип \`number\` для выражения \`1\`
   * ```
   */
  infer(term: CoreTerm, env: CoreTerm[]): CoreTerm;

  /**
   * Проверить тип сверху-вниз
   * @example
   * ```ts
   * Проверяет, что \`1\` соответствует ожидаемому типу \`number\`
   * ```
   */
  check(term: CoreTerm, expected: CoreTerm, env: CoreTerm[]): void;

  /**
   * Выполнить мапперы/дженерики/функции прямо во время компиляции
   * @example
   * ```ts
   * Раскрывает \`Pick<User, "id">\` в \`{ id: string }\`
   * ```
   */
  normalize(term: CoreTerm, env: CoreTerm[]): CoreTerm;

  /**
   * Проверить два типа на математическую эквивалентность
   * @example
   * ```ts
   * Проверяет \`string | number\` эквивалентно \`number | string\`
   * ```
   */
  equate(a: CoreTerm, b: CoreTerm): boolean;
}
