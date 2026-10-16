import { CommentRange } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseCommentRange(comment: CommentRange, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.CommentAsn {
  const rawText = comment.getText();
  const cleanText = rawText
    .replace(/^\/\/\s?/, '')
    .replace(/^\/\*+\s?/, '')
    .replace(/\*\/$/, '')
    .trim();

  const commentAsn: abstractions.translators.CommentAsn = {
    id: random.createUuid(),
    kind: 'CommentAsn',
    syntaxRole: 'text',
    value: {
      id: random.createUuid(),
      kind: 'LiteralAsn',
      value: cleanText,
      syntaxRole: 'text',
      semanticLayer: 'state',
    },
  };

  if (!ctx.enter(commentAsn, comment as any)) {
    return commentAsn;
  }

  return ctx.leave(commentAsn, comment as any);
}