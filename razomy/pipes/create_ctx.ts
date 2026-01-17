import {Pipe} from 'razomy.pipes';
import {execute} from './execute';

export interface WithCreateCtxPipes<T> {
  createCtxPipes: Pipe<T, T>[];
}

export function createCtx<T>(ctx: WithCreateCtxPipes<T> & Partial<T>): T {
  return execute(ctx.createCtxPipes, ctx);
}
