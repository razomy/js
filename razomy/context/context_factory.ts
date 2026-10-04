import * as context from '@razomy/context';

export class ContextFactory<Pgs extends context.PipelineGenerics> {
  contextPipeline: () => context.ContextPipeline<Pgs> = ()=> new context.ContextPipeline<Pgs>(null!);
}

export type ContextFactoryMap<Pgs extends context.PipelineGenerics>  = {
  [K in keyof ContextFactory<Pgs>]: ReturnType<ContextFactory<Pgs>[K]>;
}

export type ContextFactoryKey = keyof ContextFactoryMap<any>;

export type ApplyPipeline<
  URI extends ContextFactoryKey,
  Pgs extends context.PipelineGenerics,
> = ContextFactoryMap<Pgs>[URI];
