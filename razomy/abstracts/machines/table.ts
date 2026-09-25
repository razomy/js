import * as abstracts from "@razomy/abstracts";

export interface Table<T = any> {
  onDelete: abstracts.functions.Function<[T]>[];
  onUpdate: abstracts.functions.Function<[T]>[];
  onCreate: abstracts.functions.Function<[T]>[];

  delete(t: T);
}
