import * as offset from '@razomy/offset';
import * as pipes from '@razomy/pipes';
import * as function_ from '@razomy/function';
import * as tokenOffsetDeep from '@razomy/token-offset-deep';
import * as tokenOffset from '@razomy/token-offset';
import * as token from '@razomy/token';
import * as resultNull from '@razomy/result-null';
import * as result from '@razomy/result';
import * as context from '@razomy/context';
import * as abstracts from '@razomy/abstracts';

export type JsonTokenType = 'value' | 'break' | 'assign';
export type JsonToken = token.WithTokenType<JsonTokenType> &
  abstracts.domains.WithValue<string> &
  tokenOffsetDeep.WithDeep;

export function jsonToObject(jsonTokens: JsonToken[]) {
  const c = context.create(
    { tokens: jsonTokens },
    { offset: 0 },
    { stack: [] as number[] },
    { deep: 0 },
  ) satisfies token.WithTokens<JsonToken> & offset.WithOffset;
  const rs = {
    // Primitives
    key: (c) => pipes.tryP(c, function_.f(tokenOffset.tryTokenValue, 'value')),
    scalar: (c) => pipes.tryP(c, function_.f(tokenOffset.tryTokenValue, 'value')),
    assign: (c) => pipes.tryP(c, function_.f(tokenOffset.tryTokenValue, 'assign')),
    break_: (c) => pipes.tryP(c, function_.f(tokenOffset.tryTokenValue, 'break')),
    optBreak: (c) => pipes.tryP(c, function_.f(resultNull.optinal, rs.break_, { offset: 0, result: null })),
    // Recursion / Alternatives
    tail: (c) => pipes.tryP(c, function_.f(resultNull.any, [rs.inlineEntry, rs.scalar])),
    nestedBlock: (c) =>
      pipes.tryP(
        c,
        function_.f(tokenOffsetDeep.tryScope, rs.statement),
        result.fMutResult((c, ...results) => Object.assign({}, ...results)),
      ),
    // Sequences
    inlineEntry: (c) =>
      pipes.tryP(
        c,
        function_.f(tokenOffset.tryAll, [rs.key, rs.assign, rs.tail, rs.optBreak]),
        result.fMutResult((c, [key, a, tail]) => ({ [key]: tail })),
      ),
    blockEntry: (c) =>
      pipes.tryP(
        c,
        function_.f(tokenOffset.tryAll, [rs.key, rs.assign, rs.break_, rs.nestedBlock]),
        result.fMutResult((c, [key, a, b, blk]) => ({ [key]: blk })),
      ),
    // region
    statement: (c) => pipes.tryP(c, function_.f(resultNull.any, [rs.inlineEntry, rs.blockEntry])),
    // start
    root: (c) =>
      pipes.tryP(
        c,
        function_.f(tokenOffsetDeep.tryScope, rs.statement),
        result.fMutResult((c, ...results) => Object.assign({}, ...results)),
      ),
  } satisfies resultNull.ResultNullRegistry<typeof c>;

  const rootRes = rs.root(c);
  return rootRes ? rootRes.result : null;
}
