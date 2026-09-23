import * as abstracts from '@razomy/abstracts';

export type Id = string;
/**
 * @index
 */
export type Primary<T> = T;
/**
 * @index
 */
export type Uuid = string;

export interface HasId extends abstracts.meta.IHas {
  /**
   * @default id()
   */
  id: Id;
}

export interface HasPrimaryId extends HasId {
  id: Primary<Uuid>;
}
