import * as context from "@razomy/context";

/**
 * Переключает контекст на новый пайплайн (свап инстанса),
 * передавая ему накопленное состояние (ctx, children, parent).
 */
export function assignPipelineSwitch<T extends context.PipelineState, P extends context.PipelineState>(instance: T, target: P): P {
  target.ctx = instance.ctx;
  target.children = instance.children;
  target.parent = instance.parent; // Важно перенести родителя для работы .get
  return target;
}
