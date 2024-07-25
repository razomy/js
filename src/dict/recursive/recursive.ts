export type DictRecursiveValue<T> = T | DictRecursive<T>
export type DictRecursive<T> = {
  [key: string]: DictRecursiveValue<T>
}
