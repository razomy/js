export interface Gate<T> {
  get(): T;

  set(resource: T);
}
