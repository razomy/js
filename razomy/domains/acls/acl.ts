import type {AnyEntityType} from "../domian";
import type {KeyEdge} from "../../abstracts/graphs/edge_list_graph";

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
  subject: KeyEdge<AnyEntityType>;
  accessLevel: AccessLevel;
  resource: KeyEdge<AnyEntityType>;
}
