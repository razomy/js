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
  subject: abstractions.graph.KeyEdge<abstractions.domain.AnyEntityType>;
  accessLevel: AccessLevel;
  resource: abstractions.graph.KeyEdge<abstractions.domain.AnyEntityType>;
}

