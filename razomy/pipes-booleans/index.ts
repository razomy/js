// Imports
import { all } from './all';
import { any } from './any';
import type { ArrayBoolPipe, BoolExecute, BoolPipe, BoolPipeable } from './bool_execute';
import { pipeableKvToPipeline } from './pipeable_kv_to_pipeline';
import type { PipeableKv } from './pipeable_kv_to_pipeline';
import { while_ } from './while_';

// Named exports
export {
  all,
  any,
  pipeableKvToPipeline,
  while_
};
export type {
  ArrayBoolPipe,
  BoolExecute,
  BoolPipe,
  BoolPipeable,
  PipeableKv
};

// Default export
const pipesBooleans = {
  all,
  any,
  pipeableKvToPipeline,
  while_,
};


export default pipesBooleans;
