import {ArrayPipe, Execute, Pipe, Pipeable} from 'razomy.pipes/booleans/execute';

import {ArgumentException} from 'razomy.exceptions/argument_exception';
import {isKv, KeyValuable} from 'razomy.kv/kv';
import {isAkv} from 'razomy.kv/is_akv';

export type PipeableKv<T> = KeyValuable<Pipeable<T>, Pipeable<T>>

export function pipeableKvToPipeline<T>(pipeableKv: PipeableKv<T>): Execute<T> {
  if (!isKv<Pipeable<T>, Pipeable<T>>(pipeableKv)) {
    throw new ArgumentException('not a kv', {pipeableKv});
  }

  let function_ = pipeableKv[0];
  let next = pipeableKv[1];

  if (isKv<Pipeable<T>, PipeableKv<T>>(next)) {
    const child = pipeableKvToPipeline(next);
    return (ctx: T) => (function_ as Pipe<T>)(ctx, child);
  }

  if (isAkv(next)) {
    const nexts: Execute<T>[] = [];
    for (let child of next) {
      nexts.push(pipeableKvToPipeline(child));
    }
    return (ctx: T) => (function_ as ArrayPipe<T>)(ctx, nexts);
  }

  return (ctx: T) => (function_ as any)(ctx, next);
}


