import * as abstracts from '@razomy/abstracts';

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
export interface CstNode {
  kind: string;
}

/**
 * Represents a single text token, whitespace, comment, or error.
 * @example
 * ```ts
 *  `const`, `// comment`, or a space `" "`
 * ```
 */
export interface TokenCst extends CstNode {
  kind: 'TokenCst';
  token: abstracts.translators.Token;
  span: abstracts.translators.Span;
}

/**
 * Represents a flat grouping of tokens (e.g., expressions in parentheses or a block).
 * @example
 * ```ts
 * `{ let a = 1; }` or `(a + b)`
 * ```
 */
export interface GroupCst extends CstNode {
  kind: 'GroupCst';
  children: Array<TokenCst | GroupCst>;
}
