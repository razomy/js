import * as context from '@razomy/context';
import * as container from "@razomy/container";

declare module '@razomy/context' {
  interface ContextFactory<Pgs extends context.PipelineGenerics> {
    dockerPipeline: () => container.DockerPipeline<Pgs>;
  }
}

if (!context.ContextFactory.prototype.dockerPipeline) {
  Object.defineProperty(context.ContextFactory.prototype, 'dockerPipeline', {
    value: function (...args: any[]) {
      return new container.DockerPipeline(null!);
    },
    writable: true,
    configurable: true,
  });
}
