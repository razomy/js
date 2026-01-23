export type BoolExecute<T> = (ctx: T) => boolean
export type BoolPipe<T> = (ctx: T, next: BoolExecute<T>) => boolean
export type ArrayBoolPipe<T> = (ctx: T, nexts: BoolExecute<T>[]) => boolean

export type BoolPipeable<T> = BoolExecute<T>
  | BoolPipe<T>
  | ArrayBoolPipe<T>
