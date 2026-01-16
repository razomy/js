export type DictKey = string

export interface Dict<T> {
  [key: DictKey]: T
}
