export type RuleResult<R> = R | null;

export type RuleFn<C, R> = (c: C) => RuleResult<R>;

export type RuleFnResult<T> = T extends (c: any) => infer R
  ? Exclude<R, null | undefined>
  : never;

export interface RuleRegistry<C> {
  [key: string]: RuleFn<C, any>
}
