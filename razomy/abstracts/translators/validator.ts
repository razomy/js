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
  infer(term: abstracts.translators.Identifier, env: abstracts.translators.Identifier[]): abstracts.translators.Identifier;

  /**
   * Проверить тип сверху-вниз
   * @example
   * ```ts
   * Проверяет, что \`1\` соответствует ожидаемому типу \`number\`
   * ```
   */
  check(
    term: abstracts.translators.Identifier,
    expected: abstracts.translators.Identifier,
    env: abstracts.translators.Identifier[],
  ): void;

  /**
   * Выполнить мапперы/дженерики/функции прямо во время компиляции
   * @example
   * ```ts
   * Раскрывает \`Pick<User, "id">\` в \`{ id: string }\`
   * ```
   */
  normalize(
    term: abstracts.translators.Identifier,
    env: abstracts.translators.Identifier[],
  ): abstracts.translators.Identifier;

  /**
   * Проверить два типа на математическую эквивалентность
   * @example
   * ```ts
   * Проверяет \`string | number\` эквивалентно \`number | string\`
   * ```
   */
  equate(a: abstracts.translators.Identifier, b: abstracts.translators.Identifier): boolean;
}
