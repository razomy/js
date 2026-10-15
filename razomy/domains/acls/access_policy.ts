import * as domains from "@razomy/domains";
import * as abstractions from "@razomy/abstractions";

export enum AccessLevel {
  DENIED = 'DENIED',
  VIEWER = 'VIEWER',
  EDITOR = 'EDITOR',
  OWNER = 'OWNER',
}

/**
 * @uniq subject resource
 */
export interface AccessPolicy {
  /**
   * @index
   */
  subject: abstractions.graphs.KeyEdge<domains.AnyEntityType>;
  accessLevel: AccessLevel;
  resource: abstractions.graphs.KeyEdge<domains.AnyEntityType>;
}
