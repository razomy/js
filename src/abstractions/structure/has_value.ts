export type Value<T> = T;

export interface HasValue<T> {
  value: T;
}

export interface Node<T> extends HasValue<T>{
}
