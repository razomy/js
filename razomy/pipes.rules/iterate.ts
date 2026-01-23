import {Context, ParseRule, RuleResult} from './ctx';


export type Grammar<R extends string> = Record<R, [ParseRule<any, any>, any]>
export type Transform<R extends string> = Record<R, (data: any) => any>

export function iterate<R extends string, T>(ruleName: R, ctx: Context<R, T> & {
  grammar: Grammar<R>,
  transform: Transform<R>
}): RuleResult<T> | null {
  const entry = ctx.grammar[ruleName];

  const [matcherFn, config] = entry;

  const result = matcherFn(config, ctx);
  return {
    ...result,
    result: ctx.transform[ruleName](result.result)
  };
}
