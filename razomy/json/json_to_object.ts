import * as pipes from '@razomy/pipes';
import * as functions from '@razomy/functions';
import * as lexemesTokenOffsetDeep from '@razomy/lexemes/token-offset-deep';
import * as lexemesTokenOffset from '@razomy/lexemes/token-offset';
import * as resources from '@razomy/resources';
import * as resources_ from '@razomy/resources';
import * as abstracts from '@razomy/abstracts';
import * as dict from "@razomy/dict";

export type JsonTokenType = 'value' | 'break' | 'assign';
export type JsonToken = abstracts.translators.WithTokenType<JsonTokenType> &
  abstracts.domains.WithValue<string> &
  lexemesTokenOffsetDeep.WithDeep;

export function jsonToObject(jsonTokens: JsonToken[]) {
  const c = dict.create(
    { tokens: jsonTokens },
    { offset: 0 },
    { stack: [] as number[] },
    { deep: 0 },
  ) satisfies abstracts.translators.WithTokens<JsonToken> & abstracts.arrays.WithOffset;
  const rs = {
    // Primitives
    key: (c) => pipes.tryP(c, functions.f(lexemesTokenOffset.tryTokenValue, 'value')),
    scalar: (c) => pipes.tryP(c, functions.f(lexemesTokenOffset.tryTokenValue, 'value')),
    assign: (c) => pipes.tryP(c, functions.f(lexemesTokenOffset.tryTokenValue, 'assign')),
    break_: (c) => pipes.tryP(c, functions.f(lexemesTokenOffset.tryTokenValue, 'break')),
    optBreak: (c) => pipes.tryP(c, functions.f(resources.optinal, rs.break_, { offset: 0, result: null })),
    // Recursion / Alternatives
    tail: (c) => pipes.tryP(c, functions.f(resources.any, [rs.inlineEntry, rs.scalar])),
    nestedBlock: (c) =>
      pipes.tryP(
        c,
        functions.f(lexemesTokenOffsetDeep.tryScope, rs.statement),
        resources_.fMutResult((c, ...results) => Object.assign({}, ...results)),
      ),
    // Sequences
    inlineEntry: (c) =>
      pipes.tryP(
        c,
        functions.f(lexemesTokenOffset.tryAll, [rs.key, rs.assign, rs.tail, rs.optBreak]),
        resources_.fMutResult((c, [key, a, tail]) => ({ [key]: tail })),
      ),
    blockEntry: (c) =>
      pipes.tryP(
        c,
        functions.f(lexemesTokenOffset.tryAll, [rs.key, rs.assign, rs.break_, rs.nestedBlock]),
        resources_.fMutResult((c, [key, a, b, blk]) => ({ [key]: blk })),
      ),
    // region
    statement: (c) => pipes.tryP(c, functions.f(resources.any, [rs.inlineEntry, rs.blockEntry])),
    // start
    root: (c) =>
      pipes.tryP(
        c,
        functions.f(lexemesTokenOffsetDeep.tryScope, rs.statement),
        resources_.fMutResult((c, ...results) => Object.assign({}, ...results)),
      ),
  } satisfies resources.ResultNullRegistry<typeof c>;

  const rootRes = rs.root(c);
  return rootRes ? rootRes.result : null;
}
