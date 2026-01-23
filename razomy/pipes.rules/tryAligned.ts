import {Context, RuleResult} from './ctx';

export interface WithDeep {
  deep: number;
}

export function tryAligned<R, T extends WithDeep>(ctx: Context<R, T>): RuleResult<T> | null {
  const t = ctx.tokens[ctx.offset];
  const currentIndent = ctx.stack[ctx.stack.length - 1] ?? -1;
  // Valid if EOF or if deep >= current
  if (!t || t.deep >= currentIndent) {
    return {result: null, offset: 0};
  }
  return null;
}

export type RuleAligned = [typeof tryAligned, null];
