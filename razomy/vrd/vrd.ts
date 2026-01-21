export type VrdOrValue<T> = Vrd<T> | T

export class Vrd<T> {
  [key: string]: VrdOrValue<T>;

  constructor(args: any = {}) {
    Object.assign(this, args);
  }
}

export function vrd<T = unknown, T1 = object>(_: T1 = {} as T1): Vrd<T> & T1 {
  return new Vrd<T>(_) as Vrd<T> & T1;
}

