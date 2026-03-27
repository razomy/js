// ==========================================
// СЛОЙ 1.1: CST (Concrete Syntax Tree) - Чистая геометрия текста
// Сохраняет всё: пробелы, комментарии, ошибки парсинга.
// Ничего не знает про язык (type vs const).
// ==========================================

export type CstSyntaxKind = 'Token' | 'Whitespace' | 'Comment' | 'Error' | 'NodeGroup';

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
export interface CstToken extends CstNode {
  kind: CstSyntaxKind;
  text: string;
}

/**
 * Represents a flat grouping of tokens (e.g., expressions in parentheses or a block).
 * @example
 * ```ts
 * `{ let a = 1; }` or `(a + b)`
 * ```
 */
export interface CstNodeGroup extends CstNode {
  kind: 'NodeGroup';
  children: Array<CstNodeGroup | CstToken>;
}
