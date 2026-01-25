import {tryAligned, WithDeep} from '../pipes.rules/tryAligned';
import {tryScope} from '../pipes.rules/tryScope';
import {createContext} from '../pipes.rules/context';
import {RuleRegistry} from '../pipes.rules/rule';
import {tryAll} from '../pipes.rules/tryAll';
import {tryTokenValue} from '../pipes.rules/tryTokenValue';
import {tryOptinal} from '../pipes.rules/tryOptinal';
import {WithTokens, WithTokenType} from '../pipes.rules/token';
import {WithOffset} from 'razomy.offset';
import {WithValue} from 'razomy.value';
import {iterate} from '../pipes.rules/iterate';
import {tryAny} from '../pipes.rules/tryAny';
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


export function jsonToObject(jsonTokens: JsonToken[]) {
  const c = createContext(
    {tokens: jsonTokens,},
    {offset: 0},
    {stack: [] as number[]},
    {deep: 0},
  ) satisfies WithTokens<JsonToken> & WithOffset;
  type C = typeof c;
  // Primitives
  const key = (c: C) => tryP(c, f(tryTokenValue, 'value'));
  const scalar = (c: C) => tryP(c, f(tryTokenValue, 'value'));
  const assign = (c: C) => tryP(c, f(tryTokenValue, 'assign'));
  const break_ = (c: C) => tryP(c, f(tryTokenValue, 'break'));
  const opt_break = (c: C) => tryP(c, f(tryOptinal, break_, {offset: 0, result: null}));
  // Recursion / Alternatives
  const tail = (c: C) => tryP(c, f(tryAny, [inline_entry, scalar]));
  const nested_block = (c: C) => tryP(c, f(tryScope, statement), fMut((c) => c['result'] = Object.assign({}, ...c.results)));
  // Sequences
  const inline_entry = (c: C) => tryP(c, f(tryAll, [key, assign, tail, opt_break]), fMut(c => c['result'] = ({[c.results[0]]: c.results[2]})));
  const block_entry = (c: C) => tryP(c, f(tryAll, [key, assign, break_, nested_block]), fMut(c => c['result'] = ({[c.results[0]]: c.results[3]})));
  // region
  const statement = (c: C) => tryP(c, f(tryAny, [inline_entry, block_entry]));
  // start
  const root = (c: C) => tryP(c, f(tryScope, statement), fMut(c => c['result'] = Object.assign({}, ...c.results)));

  const rootRes = iterate(c, root);
  return rootRes ? rootRes.result : null;
}

