import {WithOffset} from 'razomy.offset';
import {WithValue} from 'razomy.value';
import {tryP} from 'razomy.pipes';
import {f} from 'razomy.function';
import {tryScope, WithDeep} from 'razomy.token.offset.deep';
import {tryAll, tryTokenValue} from 'razomy.token.offset';
import {WithTokens, WithTokenType} from 'razomy.token';
import {any, optinal, ResultNullRegistry} from 'razomy.result.null';
import {fMutResult} from 'razomy.result';
import {create} from 'razomy.context';


export type JsonTokenType = 'value' | 'break' | 'assign';
export type JsonToken = WithTokenType<JsonTokenType> & WithValue<string> & WithDeep;

export function jsonToObject(jsonTokens: JsonToken[]) {
  const c = create(
    {tokens: jsonTokens,},
    {offset: 0},
    {stack: [] as number[]},
    {deep: 0},
  ) satisfies WithTokens<JsonToken> & WithOffset;
  type C = typeof c;
  const rs = {
    // Primitives
    key: c => tryP(c, f(tryTokenValue, 'value')),
    scalar: c => tryP(c, f(tryTokenValue, 'value')),
    assign: c => tryP(c, f(tryTokenValue, 'assign')),
    break_: c => tryP(c, f(tryTokenValue, 'break')),
    optBreak: c => tryP(c, f(optinal, rs.break_, {offset: 0, result: null})),
    // Recursion / Alternatives
    tail: c => tryP(c, f(any, [rs.inlineEntry, rs.scalar])),
    nestedBlock: c => tryP(c, f(tryScope, rs.statement), fMutResult((c, ...results) => Object.assign({}, ...results))),
    // Sequences
    inlineEntry: c => tryP(c, f(tryAll, [rs.key, rs.assign, rs.tail, rs.optBreak]), fMutResult((c, [key, a, tail]) => ({[key]: tail}))),
    blockEntry: c => tryP(c, f(tryAll, [rs.key, rs.assign, rs.break_, rs.nestedBlock]), fMutResult((c, [key, a, b, blk]) => ({[key]: blk}))),
    // region
    statement: c => tryP(c, f(any, [rs.inlineEntry, rs.blockEntry])),
    // start
    root: c => tryP(c, f(tryScope, rs.statement), fMutResult((c, ...results) => Object.assign({}, ...results))),
  } satisfies ResultNullRegistry<typeof c>;

  const rootRes = rs.root(c);
  return rootRes ? rootRes.result : null;
}

