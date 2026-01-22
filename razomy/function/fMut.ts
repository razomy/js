export function fMut<C>(f: (c: C) => any): (c: C) => C;
export function fMut<C, A>(f: (c: C, args: A) => any, args: A): (c: C) => C;
export function fMut<C, A extends any[]>(f: (c: C, ...args: A) => any, ...args: A): (c: C) => C {
  return (c: C) => {
    f(c, ...args);
    return c;
  }
}
