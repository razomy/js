import {tryAligned, WithDeep} from './tryAligned';
import {tryScope} from './tryScope';
import {createContext} from './context';
import {RuleRegistry} from './rule';
import {trySequence} from './trySequence';
import {tryToken} from './tryToken';
import {tryOptinal} from './tryOptinal';
import {WithTokens, WithTokenType} from './token';
import {WithOffset} from 'razomy.offset';
import {WithValue} from 'razomy.value';
import {iterate} from './iterate';
import {tryOneOf} from './tryOneOf';

export type JsonTokenType = 'value' | 'break' | 'assign';
export type JsonToken = WithTokenType<JsonTokenType> & WithValue<string> & WithDeep;

function ifR<T, r2>(res: T, fn: (r: NonNullable<T>) => NonNullable<r2>) {
  if (res != null) {
    return fn(res) as r2
  }
  return res
}


function first<T extends { results: any[] }>(res: T) {
  res.results = [res.results[0]]
  return res
}

function extractData<T extends { results: any }>(res: T) {
  res['data'] = res.results.map(i => i.data)
  return res as T & {data:any}
}


function mergeData<T extends { data: any }>(res: T) {
  return res.data.join(' ')
}

function firstData<T extends { data: any }>(res: T) {
  res.data = res.data[0]
  return res
}

function valueToData<T extends { token: { value: string } }>(res: T) {
  return {...res, data: res.token.value}
}

function withToken<T extends { results: { data: any }[] }>(res: T) {
  res.results = res.results.filter(i => !!i.data)
  return res
}

export function jsonToObject(jsonTokens: JsonToken[]) {
  const c = createContext(
    {tokens: jsonTokens,},
    {offset: 0},
    {stack: [] as number[]},
    {deep: 0},
  ) satisfies WithTokens<JsonToken> & WithOffset;

  const rs = {
    root: (c) => tryScope(c, rs.statement),
    statement: (c) => tryOneOf(c, [rs.inline_entry, rs.block_entry]),

    // Sequences
    inline_entry: (c) => trySequence(c, [rs.key, rs.assign, rs.tail, rs.opt_break]),
    block_entry: (c) => trySequence(c, [rs.key, rs.assign, rs.break, rs.nested_block]),

    // Recursion / Alternatives
    tail: (c) => tryOneOf(c, [rs.inline_entry, rs.scalar]),
    nested_block: (c) => tryScope(c, rs.statement),

    // Primitives
    key: (c) => tryToken(c, 'value'),
    scalar: (c) => tryToken(c, 'value'),
    assign: (c) => tryToken(c, 'assign'),
    break: (c) => tryToken(c, 'break'),
    opt_break: (c) => tryOptinal(c, rs.break),
  } satisfies RuleRegistry<typeof c>;

  const rootRes = iterate(c, rs.root);
  return rootRes ? rootRes.result : null;
}

export function yamlToObject(jsonTokens: JsonToken[]) {
  const c = createContext(
    {tokens: jsonTokens,},
    {offset: 0},
    {stack: [] as number[]},
    {deep: 0},
  ) satisfies WithTokens<JsonToken> & WithOffset;

  const rs = {
    root: (c) => ifR(ifR((ifR(tryScope(c, rs.line), withToken)), extractData), mergeData),
    line: (c) => ifR(ifR((ifR(trySequence(c, [rs.safe_word, rs.opt_break]), withToken)), extractData), firstData),
    safe_word: (c) => ifR(ifR(ifR(ifR(trySequence(c, [rs.aligned, rs.word]), withToken), first), extractData), firstData),
    aligned: (c) => tryAligned(c, {offset: 0, data: null}),
    word: (c) => ifR(tryToken(c, 'value'), valueToData),
    opt_break: (c) => tryOptinal(c, rs.break, {offset: 0, data: null}),
    break: (c) => ifR(tryToken(c, 'break'), valueToData),
  } satisfies RuleRegistry<typeof c>;

  const rootRes = iterate(c, rs.root);
  return rootRes ? rootRes.result : null;
}

