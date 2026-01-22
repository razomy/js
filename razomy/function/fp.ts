export function fp<C>(f_: (c: C) => any): (c: C) => C;
export function fp<C, A>(f_: (c: C, args: A) => any, args: A): (c: C) => C;
export function fp<C, A extends any[]>(f_: (c: C, ...args: A) => any, ...args: A): (c: C) => C {
  return (c: C) => {
    f_(c, ...args);
    return c;
  }
}
