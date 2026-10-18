import * as abstractions from '@razomy/abstractions';
// ==========================================
// СЛОЙ 1.1: CST (Concrete Syntax Tree) - Чистая геометрия текста
// Сохраняет всё: пробелы, комментарии, ошибки парсинга.
// Ничего не знает про язык (type vs const).
// ==========================================

/**
 * Base interface for all CST nodes.
 * @example
 *  Any token, whitespace, or grouped block in the source file.
 */
export interface ICsNode extends abstractions.patterns.ISyntax {
}

/**
 * Represents a single text token, whitespace, comment, or error.
 * @example
 * ```ts
 *  `const`, `// comment`, or a space `" "`
 * ```
 */
export interface TokenCsn extends ICsNode {
  kind: 'TokenCsn';
  token: abstractions.translator.Token;
  span: abstractions.translator.Span;
}

/**
 * Represents a flat grouping of tokens (e.g., expressions in parentheses or a block).
 * @example
 * ```ts
 * `{ let a = 1; }` or `(a + b)`
 * ```
 */
export interface GroupCsn extends ICsNode {
  kind: 'GroupCsn';
  children: Array<TokenCsn | GroupCsn>;
}
