import * as abstracts from '@razomy/abstracts';

export interface HasValue<T> extends abstracts.domains.IHas {
  value: abstracts.structures.Value<T>;
}
