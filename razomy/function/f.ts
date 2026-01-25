export function f<C, R>(f_: (c: C) => R): (c: C) => R;
export function f<C, A, R>(f_: (c: C, args: A) => R, args: A): (c: C) => R;
export function f<C, A extends any[], R>(f_: (c: C, ...args: A) => R, ...args: A): (c: C) => R;
export function f<C, A extends any[], R>(f_: (c: C, ...args: A) => R, ...args: A): (c: C) => R {
  return (c: C) => f_(c, ...args)
}
