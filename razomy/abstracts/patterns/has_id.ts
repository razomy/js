import * as abstracts from '@razomy/abstracts';

export type Id = string;
/**
 * @index
 */
export type Uuid = Id;

export interface HasId<T = Id> extends abstracts.patterns.IComponent {
  /**
   * @default id()
   */
  id: T;
}

/**
 * @index
 */
export type Primary<T> = T;

export interface HasPrimaryId extends HasId<Primary<Uuid>> {
  id: Primary<Uuid>;
}
