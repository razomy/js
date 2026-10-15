import * as abstractions from '@razomy/abstractions';

export type Id = string;
/**
 * @index
 */
export type Uuid = Id;

export interface HasId<T = Id> extends abstractions.patterns.IComponent {
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
