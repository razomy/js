export type MergeHasValueGet<T extends { value, get }, A> = Omit<T, 'value' | 'get'> & {
  value: T['value'] & A,
  get: T['get'] & A
}
/**
 * Мутирует текущий контекст, добавляя новые поля
 */
export function assignPipelineNext<T extends { value , get}, A>(instance: T, args: A): MergeHasValueGet<T, A> {
  Object.assign(instance.value, args);
  return instance;
}
