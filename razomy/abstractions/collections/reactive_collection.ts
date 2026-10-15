import * as abstractions from '@razomy/abstractions';

export interface ReactiveCollection<T = any> {
  onDelete: abstractions.functions.Function<[T]>[];
  onUpdate: abstractions.functions.Function<[T]>[];
  onCreate: abstractions.functions.Function<[T]>[];
  onRead: abstractions.functions.Function<[T]>[];

  delete_: abstractions.functions.Function<T[]>;
  update: abstractions.functions.Function<T[]>;
  create: abstractions.functions.Function<T[]>;
  read: abstractions.functions.Function<T[]>;
}
