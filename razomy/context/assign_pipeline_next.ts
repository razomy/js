import * as context from "@razomy/context";

/**
 * Мутирует текущий контекст, добавляя новые поля
 */
export function assignPipelineNext<T extends context.PipelineState>(instance: T, args: object): T {
    Object.assign(instance.ctx, args);
    return instance;
}
