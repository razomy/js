export type Execute<T> = (ctx: T) => boolean
export type Pipe<T> = (ctx: T, next: Execute<T>) => boolean
export type ArrayPipe<T> = (ctx: T, nexts: Execute<T>[]) => boolean

export type Pipeable<T> = Execute<T>
  | Pipe<T>
  | ArrayPipe<T>
