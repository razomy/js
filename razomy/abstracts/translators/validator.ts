import * as abstracts from '@razomy/abstracts';

// ==========================================
// ДВИЖОК КОМПИЛЯТОРА: Тайпчекер
// Работает ТОЛЬКО со слоем 3 (Core AST).
// ==========================================

export interface TypeChecker {
  /**
   * Узнать тип снизу-вверх
   * @example
   * ```ts
   * Выводит тип \`number\` для выражения \`1\`
   * ```
   */
  infer(term: abstracts.translators.CoreTerm, env: abstracts.translators.CoreTerm[]): abstracts.translators.CoreTerm;

  /**
   * Проверить тип сверху-вниз
   * @example
   * ```ts
   * Проверяет, что \`1\` соответствует ожидаемому типу \`number\`
   * ```
   */
  check(
    term: abstracts.translators.CoreTerm,
    expected: abstracts.translators.CoreTerm,
    env: abstracts.translators.CoreTerm[],
  ): void;

  /**
   * Выполнить мапперы/дженерики/функции прямо во время компиляции
   * @example
   * ```ts
   * Раскрывает \`Pick<User, "id">\` в \`{ id: string }\`
   * ```
   */
  normalize(
    term: abstracts.translators.CoreTerm,
    env: abstracts.translators.CoreTerm[],
  ): abstracts.translators.CoreTerm;

  /**
   * Проверить два типа на математическую эквивалентность
   * @example
   * ```ts
   * Проверяет \`string | number\` эквивалентно \`number | string\`
   * ```
   */
  equate(a: abstracts.translators.CoreTerm, b: abstracts.translators.CoreTerm): boolean;
}
