import * as context from "@razomy/context";

/**
 * Создает Proxy для каскадного чтения свойств (текущий ctx -> parent.get)
 */
export function createPipelineGetter<TContextAccess extends object>(instance: context.PipelineState): TContextAccess {
    return new Proxy({} as TContextAccess, {
    get: (_, prop: string) => {
      // 1. Ищем в текущем контексте
      if (prop in instance.ctx) {
        return instance.ctx[prop];
      }
      // 2. Ищем у родителя (если он есть)
      if (instance.parent && instance.parent.get) {
        return instance.parent.get[prop];
      }
      return undefined;
    },
    });
}
