import type {ArrayBoolPipe, BoolExecute, BoolPipe, BoolPipeable} from '@razomy/pipes-booleans';

import {ArgumentException} from '@razomy/exceptions';
import {isAkv, isKv, type KeyValuable} from '@razomy/kv';

export type PipeableKv<T> = KeyValuable<BoolPipeable<T>, BoolPipeable<T>>

export function pipeableKvToPipeline<T>(pipeableKv: PipeableKv<T>): BoolExecute<T> {
  if (!isKv<BoolPipeable<T>, BoolPipeable<T>>(pipeableKv)) {
    throw new ArgumentException('not a kv', {pipeableKv});
  }

  let function_ = pipeableKv[0];
  let next = pipeableKv[1];

  if (isKv<BoolPipeable<T>, PipeableKv<T>>(next)) {
    const child = pipeableKvToPipeline(next);
    return (ctx: T) => (function_ as BoolPipe<T>)(ctx, child);
  }

  if (isAkv(next)) {
    const nexts: BoolExecute<T>[] = [];
    for (let child of next) {
      nexts.push(pipeableKvToPipeline(child));
    }
    return (ctx: T) => (function_ as ArrayBoolPipe<T>)(ctx, nexts);
  }

  return (ctx: T) => (function_ as any)(ctx, next);
}


