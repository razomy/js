import { CommentRange } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

/**
 * Парсит обычный комментарий (// или /* ... *\/) в CommentAst
 */
export function parseCommentRange(comment: CommentRange): abstracts.translators.CommentAst {
  // Убираем маркеры комментариев //, /*, */
  const rawText = comment.getText();
  const cleanText = rawText
    .replace(/^\/\/\s?/, '') // однострочные //
    .replace(/^\/\*+\s?/, '') // начало многострочных /*
    .replace(/\*\/$/, '') // конец многострочных */
    .trim();

  return {
    kind: 'CommentAst',
    syntaxRole: 'text',
    value: {
      kind: 'LiteralAst',
      value: cleanText,
      syntaxRole: 'text',
      semanticLayer: 'state',
    },
  };
}
