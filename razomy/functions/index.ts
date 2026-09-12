// Imports
import { any } from './any';
import { f } from './f';
import { fMut } from './f_mut';
import { F_P, functionPipe } from './function_pipe';
import type { Unary } from './function_pipe';
import { isFunction } from './is_function';
import { P, pipe } from './pipe';
import type { HasPipes, PipeAsync } from './pipe';
import { P_S, pipeSync } from './pipe_sync';
import type { Pipe } from './pipe_sync';
import { Pipeline, fnPipe } from './pipeline';
import { tryP } from './try_p';
import type { NotNullPipe } from './try_p';

// Named exports
export {
  F_P,
  P,
  P_S,
  Pipeline,
  any,
  f,
  fMut,
  fnPipe,
  functionPipe,
  isFunction,
  pipe,
  pipeSync,
  tryP
};
export type {
  HasPipes,
  NotNullPipe,
  Pipe,
  PipeAsync,
  Unary
};

// Default export
const functions = {
  any,
  f,
  fMut,
  F_P,
  functionPipe,
  isFunction,
  P,
  pipe,
  P_S,
  pipeSync,
  Pipeline,
  fnPipe,
  tryP,
};


export default functions;
