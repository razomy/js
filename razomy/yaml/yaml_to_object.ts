import {tryAligned, WithDeep} from '../pipes.rules/try_aligned';
import {tryScope} from '../pipes.rules/try_scope';
import {createContext} from '../pipes.rules/create_context';
import {RuleRegistry} from '../pipes.rules/rule';
import {tryAll} from '../pipes.rules/try_all';
import {tryTokenValue} from '../pipes.rules/try_token_value';
import {tryOptinal} from '../pipes.rules/try_optinal';
import {WithTokens, WithTokenType} from '../pipes.rules/token';
import {WithOffset} from 'razomy.offset';
import {WithValue} from 'razomy.value';
import {iterate} from '../pipes.rules/iterate';
import {tryAny} from '../pipes.rules/try_any';
import {tryP} from 'razomy.pipes';
import {f, fMut} from 'razomy.function';

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
  const c = createContext(
    {tokens: jsonTokens,},
    {offset: 0},
    {stack: [] as number[]},
    {deep: 0},
  ) satisfies WithTokens<JsonToken> & WithOffset;

  const rs = {
    root: (c) => ifR(tryScope(c, rs.line), mergeResults),
    line: (c) => tryP(tryAll(c, [rs.safe_word, rs.opt_break]), resultsToFirstResult),
    safe_word: (c) => tryP(tryAll(c, [rs.aligned, rs.word]), resultsToFirstResult),
    aligned: (c) => tryAligned(c, {offset: 0, result: null}),
    word: (c) => (tryTokenValue(c, 'value')),
    opt_break: (c) => tryOptinal(c, rs.break, {offset: 0, result: null}),
    break: (c) => (tryTokenValue(c, 'break')),
  } satisfies RuleRegistry<typeof c>;

  const rootRes = iterate(c, rs.root);
  return rootRes ? rootRes.result : null;
}

