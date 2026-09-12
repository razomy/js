import * as functionBooleans from '@razomy/function-booleans';
import * as exceptions from '@razomy/exceptions';
import * as kv from '@razomy/kv';
import * as abstracts from '@razomy/abstracts';

export type PipeableKv<T extends any[]> = abstracts.structures.KeyValue<functionBooleans.BoolPipeType<T>, functionBooleans.BoolPipeType<T>>;

export function pipeableKvToPipeline<T extends any[]>(pipeableKv: PipeableKv<T>| PipeableKv<T>[]): functionBooleans.BoolExecute<T> {
  if (!kv.isKv<functionBooleans.BoolPipeType<T>, functionBooleans.BoolPipeType<T>>(pipeableKv)) {
    throw new exceptions.ArgumentException('not a kv', { pipeableKv });
  }

  const function_ = pipeableKv[0];
  const next = pipeableKv[1];

  if (kv.isKv<functionBooleans.BoolPipeType<T>, PipeableKv<T>>(next)) {
    const child = pipeableKvToPipeline(next);
    return (...ctx: T) => (function_ as functionBooleans.BoolPipe<T>)(ctx, child);
  }

  if (kv.isAkv(next)) {
    const nexts: functionBooleans.BoolExecute<T>[] = [];
    for (const child of next) {
      nexts.push(pipeableKvToPipeline(child));
    }
    return (...ctx: T) => (function_ as functionBooleans.ArrayBoolPipe<T>)(ctx, nexts);
  }

  return (...ctx: T) => (function_ as any)(ctx, next);
}
