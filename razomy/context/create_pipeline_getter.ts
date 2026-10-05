import * as context from "@razomy/context";

/**
 * Создает Proxy для каскадного чтения свойств (текущий ctx -> parent.get)
 */
export function createPipelineGetter<TContextAccess extends object>(instance: context.PipelineState): TContextAccess {
    return new Proxy({} as TContextAccess, {
    get: (_, prop: string) => {
      // 1. Ищем в текущем контексте
      if (prop in (instance.value as {})) {
        return (instance.value as any)[prop];
      }
      // 2. Ищем у родителя (если он есть)
      if (instance.parent && (instance.parent as context.PipelineState).get) {
        return (instance.parent as any).get[prop];
      }
      return undefined;
    },
    });
}
