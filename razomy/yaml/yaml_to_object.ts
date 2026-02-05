import {WithOffset} from '@razomy/offset';
import {WithValue} from '@razomy/value';
import {tryP} from '@razomy/pipes';
import {tryAligned, tryScope, WithDeep} from '@razomy/token.offset.deep';
import {tryAll, tryTokenValue} from '@razomy/token.offset';
import {WithTokens, WithTokenType} from '@razomy/token';
import {create} from '@razomy/context';
import {optinal, ResultNullRegistry} from '@razomy/result.null';

export type JsonTokenType = 'value' | 'break' | 'assign';
export type JsonToken = WithTokenType<JsonTokenType> & WithValue<string> & WithDeep;

function ifR<T, r2>(res: T, fn: (r: NonNullable<T>) => NonNullable<r2>) {
  if (res != null) {
    return fn(res) as r2
  }
  return res
}

function mergeResults<T extends { results: any }>(res: T) {
  return res.results.join(' ')
}

function resultsToFirstResult<T extends { results: D[] }, D = any>(res: T) {
  const nres = {...res, result: res.results[0]}
  return nres
}

export function yamlToObject(jsonTokens: JsonToken[]) {
  const c = create(
    {tokens: jsonTokens,},
    {offset: 0},
    {stack: [] as number[]},
    {deep: 0},
    {children: [] as any}
  ) satisfies WithTokens<JsonToken> & WithOffset;

  const rs = {
    root: (c) => ifR(tryScope(c, rs.line), mergeResults),
    line: (c) => tryP(tryAll(c, [rs.safe_word, rs.opt_break]), resultsToFirstResult),
    safe_word: (c) => tryP(tryAll(c, [rs.aligned, rs.word]), resultsToFirstResult),
    aligned: (c) => tryAligned(c, {offset: 0, result: null}),
    word: (c) => (tryTokenValue(c, 'value')),
    opt_break: (c) => optinal(c, rs.break, {offset: 0, result: null}),
    break: (c) => (tryTokenValue(c, 'break')),
  } satisfies ResultNullRegistry<typeof c>;

  const rootRes = rs.root(c);
  return rootRes ? rootRes.result : null;
}

