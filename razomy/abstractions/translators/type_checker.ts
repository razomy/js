import * as abstractions from '@razomy/abstractions';

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
  infer(term: abstractions.translators.Identifier, env: abstractions.translators.Identifier[]): abstractions.translators.Identifier;

  /**
   * Проверить тип сверху-вниз
   * @example
   * ```ts
   * Проверяет, что \`1\` соответствует ожидаемому типу \`number\`
   * ```
   */
  check(
    term: abstractions.translators.Identifier,
    expected: abstractions.translators.Identifier,
    env: abstractions.translators.Identifier[],
  ): void;

  /**
   * Выполнить мапперы/дженерики/функции прямо во время компиляции
   * @example
   * ```ts
   * Раскрывает \`Pick<User, "id">\` в \`{ id: string }\`
   * ```
   */
  normalize(
    term: abstractions.translators.Identifier,
    env: abstractions.translators.Identifier[],
  ): abstractions.translators.Identifier;

  /**
   * Проверить два типа на математическую эквивалентность
   * @example
   * ```ts
   * Проверяет \`string | number\` эквивалентно \`number | string\`
   * ```
   */
  equate(a: abstractions.translators.Identifier, b: abstractions.translators.Identifier): boolean;
}
