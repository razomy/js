import * as functions from '@razomy/functions';
import * as resources from '@razomy/resources';
import * as resources_ from '@razomy/resources';
import * as abstracts from '@razomy/abstracts';
import * as dict from "@razomy/dict";
import * as lexemes from "@razomy/lexemes";

export type JsonTokenType = 'value' | 'break' | 'assign';
export type JsonToken = abstracts.translators.HasTokenType<JsonTokenType> &
  abstracts.structures.HasValue<string> &
  lexemes.tokenOffsetDeep.HasDeep;

export function jsonToObject(jsonTokens: JsonToken[]) {
  const c = dict.create(
    { tokens: jsonTokens },
    { offset: 0 },
    { stack: [] as number[] },
    { deep: 0 },
  ) satisfies abstracts.translators.HasTokens<JsonToken> & abstracts.arrays.HasOffset;
  const rs = {
    // Primitives
    key: (c) => functions.tryP(c, functions.f(lexemes.tokenOffset.tryTokenValue, 'value')),
    scalar: (c) => functions.tryP(c, functions.f(lexemes.tokenOffset.tryTokenValue, 'value')),
    assign: (c) => functions.tryP(c, functions.f(lexemes.tokenOffset.tryTokenValue, 'assign')),
    break_: (c) => functions.tryP(c, functions.f(lexemes.tokenOffset.tryTokenValue, 'break')),
    optBreak: (c) => functions.tryP(c, functions.f(resources.optinal, rs.break_, { offset: 0, result: null })),
    // Recursion / Alternatives
    tail: (c) => functions.tryP(c, functions.f(functions.any, [rs.inlineEntry, rs.scalar])),
    nestedBlock: (c) =>
      functions.tryP(
        c,
        functions.f(lexemes.tokenOffsetDeep.tryScope, rs.statement),
        resources_.fMutResult((c, ...results) => Object.assign({}, ...results)),
      ),
    // Sequences
    inlineEntry: (c) =>
      functions.tryP(
        c,
        functions.f(lexemes.tokenOffset.tryAll, [rs.key, rs.assign, rs.tail, rs.optBreak]),
        resources_.fMutResult((c, [key, a, tail]) => ({ [key]: tail })),
      ),
    blockEntry: (c) =>
      functions.tryP(
        c,
        functions.f(lexemes.tokenOffset.tryAll, [rs.key, rs.assign, rs.break_, rs.nestedBlock]),
        resources_.fMutResult((c, [key, a, b, blk]) => ({ [key]: blk })),
      ),
    // region
    statement: (c) => functions.tryP(c, functions.f(functions.any, [rs.inlineEntry, rs.blockEntry])),
    // start
    root: (c) =>
      functions.tryP(
        c,
        functions.f(lexemes.tokenOffsetDeep.tryScope, rs.statement),
        resources_.fMutResult((c, ...results) => Object.assign({}, ...results)),
      ),
  } satisfies resources.ResultNullRegistry<typeof c>;

  const rootRes = rs.root(c);
  return rootRes ? rootRes.result : null;
}
