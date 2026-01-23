export type ParseRule<R, T> = (ruleName: R, ctx: Context<R, T>) => RuleResult<T>;

export interface Context<R, T> {
  tokens: T[];
  offset: number;
  stack: number[];
  parseRule: ParseRule<R, T>;
}

export type RuleResult<T = any> = {
  result: T | null;
  offset: number;
};
