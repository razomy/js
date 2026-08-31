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
  infer(term: abstracts.translators.IdentifierAst, env: abstracts.translators.IdentifierAst[]): abstracts.translators.IdentifierAst;

  /**
   * Проверить тип сверху-вниз
   * @example
   * ```ts
   * Проверяет, что \`1\` соответствует ожидаемому типу \`number\`
   * ```
   */
  check(
    term: abstracts.translators.IdentifierAst,
    expected: abstracts.translators.IdentifierAst,
    env: abstracts.translators.IdentifierAst[],
  ): void;

  /**
   * Выполнить мапперы/дженерики/функции прямо во время компиляции
   * @example
   * ```ts
   * Раскрывает \`Pick<User, "id">\` в \`{ id: string }\`
   * ```
   */
  normalize(
    term: abstracts.translators.IdentifierAst,
    env: abstracts.translators.IdentifierAst[],
  ): abstracts.translators.IdentifierAst;

  /**
   * Проверить два типа на математическую эквивалентность
   * @example
   * ```ts
   * Проверяет \`string | number\` эквивалентно \`number | string\`
   * ```
   */
  equate(a: abstracts.translators.IdentifierAst, b: abstracts.translators.IdentifierAst): boolean;
}
