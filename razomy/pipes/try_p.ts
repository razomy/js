export type NotNullPipe<T, R> = (arg: NonNullable<T>) => R;

export function tryP<T, A>(arg: T, ...fns: [NotNullPipe<T, A>]): NonNullable<A> | null;
export function tryP<T, A, B>(arg: T, ...fns: [NotNullPipe<T, A>, NotNullPipe<A, B>]): NonNullable<B> | null;
export function tryP<T, A, B, C>(arg: T, ...fns: [NotNullPipe<T, A>, NotNullPipe<A, B>]): NonNullable<B> | null;
export function tryP(initialValue: any, ...fns: NotNullPipe<any, any>[]) {
  let result = initialValue;
  for (const fn of fns) {
    result = fn(result);
    if (result == null) {
      return null
    }
  }
  return result;
}
