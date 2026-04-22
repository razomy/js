import * as abstracts from '@razomy/abstracts';
import * as pipes from '@razomy/pipes';
import * as lexemesTokenOffsetDeep from '@razomy/lexemes/token-offset-deep';
import * as lexemesTokenOffset from '@razomy/lexemes/token-offset';
import * as dict from "@razomy/dict";
import * as resources from "@razomy/resources";

export type JsonTokenType = 'value' | 'break' | 'assign';
export type JsonToken = abstracts.translators.WithTokenType<JsonTokenType> &
  abstracts.domains.WithValue<string> &
  lexemesTokenOffsetDeep.WithDeep;

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
    root: (c) => ifR(lexemesTokenOffsetDeep.tryScope(c, rs.line), mergeResults),
    line: (c) => pipes.tryP(lexemesTokenOffset.tryAll(c, [rs.safe_word, rs.opt_break]), resultsToFirstResult),
    safe_word: (c) => pipes.tryP(lexemesTokenOffset.tryAll(c, [rs.aligned, rs.word]), resultsToFirstResult),
    aligned: (c) => lexemesTokenOffsetDeep.tryAligned(c, { offset: 0, result: null }),
    word: (c) => lexemesTokenOffset.tryTokenValue(c, 'value'),
    opt_break: (c) => resources.optinal(c, rs.break, { offset: 0, result: null }),
    break: (c) => lexemesTokenOffset.tryTokenValue(c, 'break'),
  } satisfies resources.ResultNullRegistry<typeof c>;

  const rootRes = rs.root(c);
  return rootRes ? rootRes.result : null;
}
