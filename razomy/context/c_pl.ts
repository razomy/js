import * as context from '@razomy/context';

export function cPl<T>(class_: new (p: any) => T): T;
export function cPl(): context.ContextPipeline;
export function cPl<T>(class_?: new (p: any) => T): T | context.ContextPipeline {
  if (class_) {
    return new class_(null!);
  }
  return new context.ContextFactory().contextPipeline();
}
