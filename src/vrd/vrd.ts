import {Dict} from 'razomy.dict/dict';

export type VrdOrValue<T> = Vrd<T> | T

export interface Vrd<T> extends Dict<VrdOrValue<T>> {
}

export class Vrd<T> implements Vrd<T> {
  [key: string]: VrdOrValue<T>;

  constructor(args: any = {}) {
    Object.assign(this, args);
  }
}

export function vrd<T = unknown, T1 = object>(_: T1): Vrd<T> & T1 {
  return new Vrd<T>(_) as Vrd<T> & T1;
}

