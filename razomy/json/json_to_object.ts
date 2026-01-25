import {
  createContext,
  fMutResult,
  iterate,
  RuleRegistry,
  tryAll,
  tryAny,
  tryOptinal,
  tryScope,
  tryTokenValue,
  WithDeep,
  WithTokens,
  WithTokenType
} from 'razomy.pipes.rules';
import {WithOffset} from 'razomy.offset';
import {WithValue} from 'razomy.value';
import {tryP} from 'razomy.pipes';
import {f} from 'razomy.function';

export type JsonTokenType = 'value' | 'break' | 'assign';
export type JsonToken = WithTokenType<JsonTokenType> & WithValue<string> & WithDeep;

export function jsonToObject(jsonTokens: JsonToken[]) {
  const c = createContext(
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
    optBreak: c => tryP(c, f(tryOptinal, rs.break_, {offset: 0, result: null})),
    // Recursion / Alternatives
    tail: c => tryP(c, f(tryAny, [rs.inlineEntry, rs.scalar])),
    nestedBlock: c => tryP(c, f(tryScope, rs.statement), fMutResult((c, ...results) => Object.assign({}, ...results))),
    // Sequences
    inlineEntry: c => tryP(c, f(tryAll, [rs.key, rs.assign, rs.tail, rs.optBreak]), fMutResult<any, any, any>((c, key, a, tail) => ({[key]: tail}))),
    blockEntry: c => tryP(c, f(tryAll, [rs.key, rs.assign, rs.break_, rs.nestedBlock]), fMutResult<any, any, any>((c, key, a, b, blk) => ({[key]: blk}))),
    // region
    statement: c => tryP(c, f(tryAny, [rs.inlineEntry, rs.blockEntry])),
    // start
    root: c => tryP(c, f(tryScope, rs.statement), fMutResult((c, ...results) => Object.assign({}, ...results))),
  } satisfies RuleRegistry<typeof c>;

  const rootRes = iterate(c, rs.root);
  return rootRes ? rootRes.result : null;
}

