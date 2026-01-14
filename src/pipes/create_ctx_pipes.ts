import {execute, Pipe} from 'razomy.pipes/pipe';

export interface WithCreateCtxPipes<T> {
  create_ctx_pipes: Pipe<T, T>[];
}

export function create_ctx<T>(ctx: WithCreateCtxPipes<T> & Partial<T>): T {
  return execute(ctx.create_ctx_pipes, ctx);
}
