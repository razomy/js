import {RuleResult} from './rule';
import {WithTokens, WithTokenType} from './token';
import {WithOffset} from 'razomy.offset';

export interface WithDeep {
  deep: number;
}

export interface WithStack {
  stack: number[];
}

export function tryAligned<
  TToken extends WithTokenType<any> & WithDeep,
  D extends object
>(
  ctx: WithTokens<TToken> & WithOffset & WithStack,
  deafult_: D = {} as D
) {

  const t = ctx.tokens[ctx.offset];
  const currentIndent = ctx.stack[ctx.stack.length - 1] ?? -1;

  if (!t || t.deep >= currentIndent) {
    return deafult_;
  }

  return null;
}
