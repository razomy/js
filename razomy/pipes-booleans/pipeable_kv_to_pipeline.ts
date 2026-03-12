import * as pipesBooleans from '@razomy/pipes-booleans';
import * as exceptions from '@razomy/exceptions';
import * as kv from '@razomy/kv';

export type PipeableKv<T> = kv.KeyValuable<pipesBooleans.BoolPipeable<T>, pipesBooleans.BoolPipeable<T>>;

export function pipeableKvToPipeline<T>(pipeableKv: PipeableKv<T>): pipesBooleans.BoolExecute<T> {
  if (!kv.isKv<pipesBooleans.BoolPipeable<T>, pipesBooleans.BoolPipeable<T>>(pipeableKv)) {
    throw new exceptions.ArgumentException('not a kv', { pipeableKv });
  }

  let function_ = pipeableKv[0];
  let next = pipeableKv[1];

  if (kv.isKv<pipesBooleans.BoolPipeable<T>, PipeableKv<T>>(next)) {
    const child = pipeableKvToPipeline(next);
    return (ctx: T) => (function_ as pipesBooleans.BoolPipe<T>)(ctx, child);
  }

  if (kv.isAkv(next)) {
    const nexts: pipesBooleans.BoolExecute<T>[] = [];
    for (let child of next) {
      nexts.push(pipeableKvToPipeline(child));
    }
    return (ctx: T) => (function_ as pipesBooleans.ArrayBoolPipe<T>)(ctx, nexts);
  }

  return (ctx: T) => (function_ as any)(ctx, next);
}
