import * as abstractions from '@razomy/abstractions';

/**
 * General identifier
 */
export interface HasName extends abstractions.meta.IHas {
  name: string;
}
