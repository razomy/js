import * as offset from '../abstracts/arrays/offest';
import * as abstracts from '@razomy/abstracts';
import * as pipes from '@razomy/pipes';
import * as tokenOffsetDeep from '@razomy/token-offset-deep';
import * as tokenOffset from '@razomy/token-offset';
import * as token from '@razomy/token';
import * as context from '@razomy/context';
import * as resultNull from '@razomy/result-null';

export type JsonTokenType = 'value' | 'break' | 'assign';
export type JsonToken = token.WithTokenType<JsonTokenType> &
  abstracts.domains.WithValue<string> &
  tokenOffsetDeep.WithDeep;

function ifR<T, r2>(res: T, fn: (r: NonNullable<T>) => NonNullable<r2>) {
  if (res != null) {
    return fn(res) as r2;
  }
  return res;
}

function mergeResults<T extends { results: any }>(res: T) {
  return res.results.join(' ');
}

function resultsToFirstResult<T extends { results: D[] }, D = any>(res: T) {
  const nres = { ...res, result: res.results[0] };
  return nres;
}

export function yamlToObject(jsonTokens: JsonToken[]) {
  const c = context.create(
    { tokens: jsonTokens },
    { offset: 0 },
    { stack: [] as number[] },
    { deep: 0 },
    { children: [] as any },
  ) satisfies token.WithTokens<JsonToken> & offset.WithOffset;

  const rs = {
    root: (c) => ifR(tokenOffsetDeep.tryScope(c, rs.line), mergeResults),
    line: (c) => pipes.tryP(tokenOffset.tryAll(c, [rs.safe_word, rs.opt_break]), resultsToFirstResult),
    safe_word: (c) => pipes.tryP(tokenOffset.tryAll(c, [rs.aligned, rs.word]), resultsToFirstResult),
    aligned: (c) => tokenOffsetDeep.tryAligned(c, { offset: 0, result: null }),
    word: (c) => tokenOffset.tryTokenValue(c, 'value'),
    opt_break: (c) => resultNull.optinal(c, rs.break, { offset: 0, result: null }),
    break: (c) => tokenOffset.tryTokenValue(c, 'break'),
  } satisfies resultNull.ResultNullRegistry<typeof c>;

  const rootRes = rs.root(c);
  return rootRes ? rootRes.result : null;
}
