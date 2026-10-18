import * as context from '@razomy/context';

/**
 * Создает дочерний пайплайн через полиморфный вызов конструктора и связывает контексты
 */
export function assignPipelineChild<T extends context.PipelineState>(
  instance: T,
  propName: string,
  cb: (child: any) => any,
): T {
  const ctor = (instance as any).constructor as new (parent: any) => any;
  const child = new ctor(instance);
  child.value.name = propName;
  const childResult = cb(child);
  (instance.children as {})[propName] = childResult;
  Object.assign(instance.value as {}, { [propName]: childResult.value });
  return instance;
}
