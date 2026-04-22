import * as pipesBooleans from '@razomy/pipes-booleans';
import * as exceptions from '@razomy/exceptions';
import * as kv from '@razomy/kv';
import * as abstracts from '@razomy/abstracts';

export type PipeableKv<T> = abstracts.structures.KeyValue<pipesBooleans.BoolPipeable<T>, pipesBooleans.BoolPipeable<T>>;

export function pipeableKvToPipeline<T>(pipeableKv: PipeableKv<T>| PipeableKv<T>[]): pipesBooleans.BoolExecute<T> {
  if (!kv.isKv<pipesBooleans.BoolPipeable<T>, pipesBooleans.BoolPipeable<T>>(pipeableKv)) {
    throw new exceptions.ArgumentException('not a kv', { pipeableKv });
  }

  const function_ = pipeableKv[0];
  const next = pipeableKv[1];

  if (kv.isKv<pipesBooleans.BoolPipeable<T>, PipeableKv<T>>(next)) {
    const child = pipeableKvToPipeline(next);
    return (ctx: T) => (function_ as pipesBooleans.BoolPipe<T>)(ctx, child);
  }

  if (kv.isAkv(next)) {
    const nexts: pipesBooleans.BoolExecute<T>[] = [];
    for (const child of next) {
      nexts.push(pipeableKvToPipeline(child));
    }
    return (ctx: T) => (function_ as pipesBooleans.ArrayBoolPipe<T>)(ctx, nexts);
  }

  return (ctx: T) => (function_ as any)(ctx, next);
}
