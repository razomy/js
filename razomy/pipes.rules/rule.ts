import {createContext} from './create_context';
import {JsonToken} from 'razomy.json';

export type RuleResult<R> = ({ result: any, offset: number } & R) | null;

export type RuleFn<C, R> = (c: C) => RuleResult<R>;

export type RuleFnResult<T> = T extends (c: any) => infer R
  ? Exclude<R, null | undefined>
  : never;

export interface RuleRegistry<C> {
  [key: string]: RuleFn<C, any>
}

export function fMutResult<C extends { results: R }, R extends any[], V>(f: (c: C, ...r: R) => V) {
  return (c: C) => {
    return {...c, result: f(c, ...c.results)};
  }
}
