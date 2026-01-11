import {
  Pipe,
  ArrayPipe,
  Execute,
  Pipeable
} from "razomy/pipes/booleans/execute";

import {ArgumentException} from "razomy/exceptions/argument_exception";
import {is_kv, KeyValuable, Kv} from "razomy/kv/kv";
import {is_akv} from "razomy/kv/akv";

export type PipeableKv<T> = KeyValuable<Pipeable<T>, Pipeable<T>>

export function pipeable_kv_to_pipeline<T>(pipeable_kv: PipeableKv<T>): Execute<T> {
  if (!is_kv<Pipeable<T>, Pipeable<T>>(pipeable_kv)) {
    throw new ArgumentException('not a kv', {pipeable_kv});
  }

  let function_ = pipeable_kv[0];
  let next = pipeable_kv[1];

  if (is_kv<Pipeable<T>, PipeableKv<T>>(next)) {
    const child = pipeable_kv_to_pipeline(next);
    return (ctx: T) => (function_ as Pipe<T>)(ctx, child);
  }

  if (is_akv(next)) {
    const nexts: Execute<T>[] = [];
    for (let child of next) {
      nexts.push(pipeable_kv_to_pipeline(child));
    }
    return (ctx: T) => (function_ as ArrayPipe<T>)(ctx, nexts);
  }

  return (ctx: T) => (function_ as any)(ctx, next);
}
