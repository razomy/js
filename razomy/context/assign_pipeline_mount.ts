import * as context from "@razomy/context";

/**
 * Монтирует уже готовый пайплайн как дочерний
 */
export function assignPipelineMount<T extends context.PipelineState, P extends context.PipelineState>(
  instance: T,
  propName: string,
  target: P,
): T {
  target.parent = instance;
  instance.children[propName] = target;
  Object.assign(instance.ctx, { [propName]: target.ctx });
  return instance;
}

