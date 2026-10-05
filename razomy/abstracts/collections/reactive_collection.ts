import * as abstracts from '@razomy/abstracts';

export interface ReactiveCollection<T = any> {
  onDelete: abstracts.functions.Function<[T]>[];
  onUpdate: abstracts.functions.Function<[T]>[];
  onCreate: abstracts.functions.Function<[T]>[];
  onRead: abstracts.functions.Function<[T]>[];

  delete_: abstracts.functions.Function<T[]>;
  update: abstracts.functions.Function<T[]>;
  create: abstracts.functions.Function<T[]>;
  read: abstracts.functions.Function<T[]>;
}
