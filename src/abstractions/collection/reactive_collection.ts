import * as abstractions from '@razomy/abstractions';

export interface ReactiveCollection<T = any> {
  onDelete: abstractions.function_.Function<[T]>[];
  onUpdate: abstractions.function_.Function<[T]>[];
  onCreate: abstractions.function_.Function<[T]>[];
  onRead: abstractions.function_.Function<[T]>[];

  delete_: abstractions.function_.Function<T[]>;
  update: abstractions.function_.Function<T[]>;
  create: abstractions.function_.Function<T[]>;
  read: abstractions.function_.Function<T[]>;
}
