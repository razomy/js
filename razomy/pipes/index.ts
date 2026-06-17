// Imports
import { ChainRegistry, fp } from './chain_registry';
import type { ArrayChainMethods, BaseChain, Chain, Chainable, StringChainMethods, StripFirstArg } from './chain_registry';
import { F_P, functionPipe } from './function_pipe';
import type { Unary } from './function_pipe';
import { P, pipe } from './pipe';
import type { PipeAsync } from './pipe';
import { P_S, pipeSync } from './pipe_sync';
import type { Pipe } from './pipe_sync';
import { tryP } from './try_p';
import type { NotNullPipe } from './try_p';
import type { HasPipes } from './with_pipes';

// Named exports
export {
  ChainRegistry,
  F_P,
  P,
  P_S,
  fp,
  functionPipe,
  pipe,
  pipeSync,
  tryP
};
export type {
  ArrayChainMethods,
  BaseChain,
  Chain,
  Chainable,
  HasPipes,
  NotNullPipe,
  Pipe,
  PipeAsync,
  StringChainMethods,
  StripFirstArg,
  Unary
};

// Default export
const pipes = {
  ChainRegistry,
  fp,
  F_P,
  functionPipe,
  P,
  pipe,
  P_S,
  pipeSync,
  tryP,
};


export default pipes;
