import * as abstracts from '@razomy/abstracts';
import * as pipes from '@razomy/pipes';
import * as dict from "@razomy/dict";
import * as resources from "@razomy/resources";
import * as lexemes from "@razomy/lexemes";

export type JsonTokenType = 'value' | 'break' | 'assign';
export type JsonToken = abstracts.translators.WithTokenType<JsonTokenType> &
  abstracts.domains.WithValue<string> &
  lexemes.tokenOffsetDeep.WithDeep;

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
  const c = dict.create(
    { tokens: jsonTokens },
    { offset: 0 },
    { stack: [] as number[] },
    { deep: 0 },
    { children: [] as any },
  ) satisfies abstracts.translators.WithTokens<JsonToken> & abstracts.arrays.WithOffset;

  const rs = {
    root: (c) => ifR(lexemes.tokenOffsetDeep.tryScope(c, rs.line), mergeResults),
    line: (c) => pipes.tryP(lexemes.tokenOffset.tryAll(c, [rs.safe_word, rs.opt_break]), resultsToFirstResult),
    safe_word: (c) => pipes.tryP(lexemes.tokenOffset.tryAll(c, [rs.aligned, rs.word]), resultsToFirstResult),
    aligned: (c) => lexemes.tokenOffsetDeep.tryAligned(c, { offset: 0, result: null }),
    word: (c) => lexemes.tokenOffset.tryTokenValue(c, 'value'),
    opt_break: (c) => resources.optinal(c, rs.break, { offset: 0, result: null }),
    break: (c) => lexemes.tokenOffset.tryTokenValue(c, 'break'),
  } satisfies resources.ResultNullRegistry<typeof c>;

  const rootRes = rs.root(c);
  return rootRes ? rootRes.result : null;
}
