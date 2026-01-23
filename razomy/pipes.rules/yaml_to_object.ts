import {tryAligned} from './tryAligned';
import {tryScope} from './tryScope';
import {trySequnce} from './trySequnce';
import {tryOptinal} from './tryOptinal';
import {tryOneOf} from './tryOneOf';
import {tryToken} from './tryToken';
import {iterate} from './iterate';

export type TokenType = 'word' | 'break';
export type Token = { deep: number, type: TokenType, value: string }

const matchers = {
  token: tryToken,
  aligned: tryAligned,
  scope: tryScope,
  seq: trySequnce,
  oneOf: tryOneOf,
  opt: tryOptinal,
};

type t = typeof matchers;
type ks = keyof t;

type AnyRule = t[ks]

const MyLang = {
  grammar: {
    root: [matchers.scope, 'line'],
    line: [matchers.seq, ['safe_word', 'opt_break']],

    // Composition: [null, Token] -> filtered to [Token] by matchSeq
    safe_word: [matchers.seq, ['aligned', 'word']],

    aligned: [matchers.aligned, null],
    word: [matchers.token, 'word'],
    opt_break: [matchers.opt, 'break'],
    break: [matchers.token, 'break']
  },

  transform: {
    // 1. Return NULL for breaks so they are removed from arrays
    break: function () {
      return null;
    },

    // 2. safe_word comes in as [Token], unwrap to String
    safe_word: function ([token]: [Token]) {
      return token.value;
    },

    // 3. line comes in as ["hello"] (break was null), unwrap to String
    line: function ([word]: [string]) {
      return word;
    }
  }
};

export function yamlToObject(tokens: Token[]) {
  const context = {
    tokens,
    pos: 0,
    stack: [-1],
    parseRule: iterate,
    grammar: MyLang.grammar,
    transform: MyLang.transform,
  };
  const rootRes = context.parseRule('root', context as any);
  return rootRes ? rootRes.result : null;
}