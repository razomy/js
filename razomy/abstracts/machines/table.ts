import { type Function } from '@razomy/abstracts/functions';

export interface Table<T = any> {
  onDelete: Function<[T]>[];
  onUpdate: Function<[T]>[];
  onCreate: Function<[T]>[];

  delete(t: T);
}
