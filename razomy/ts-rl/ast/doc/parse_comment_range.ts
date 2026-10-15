import { CommentRange } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

/**
 * Парсит обычный комментарий (// или /* ... *\/) в CommentAsn
 */
export function parseCommentRange(comment: CommentRange, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.CommentAsn {
  // Убираем маркеры комментариев //, /*, */
  const rawText = comment.getText();
  const cleanText = rawText
    .replace(/^\/\/\s?/, '') // однострочные //
    .replace(/^\/\*+\s?/, '') // начало многострочных /*
    .replace(/\*\/$/, '') // конец многострочных */
    .trim();

  return {
    kind: 'CommentAsn',
    syntaxRole: 'text',
    value: {
      kind: 'LiteralAsn',
      value: cleanText,
      syntaxRole: 'text',
      semanticLayer: 'state',
    },
  };
}
