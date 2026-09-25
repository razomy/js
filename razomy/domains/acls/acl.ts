import * as domains from "@razomy/domains";
import * as abstracts from "@razomy/abstracts";

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
  subject: abstracts.graphs.KeyEdge<domains.AnyEntityType>;
  accessLevel: AccessLevel;
  resource: abstracts.graphs.KeyEdge<domains.AnyEntityType>;
}
