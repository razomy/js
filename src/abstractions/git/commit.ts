import * as abstractions from "@razomy/abstractions";

export enum DifferenceType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

/**
 * @index createdAt
 * @index createdAt
 */
export interface Commit extends abstractions.identity.UserChild, abstractions.patterns.CrudDateTime{
  entity: abstractions.graph.KeyEdge<abstractions.domain.AnyEntityType>;

  differenceType: DifferenceType;
  difference: abstractions.patterns.Json;
  /** @uniq */
  commitHash: string;
  /** @uniq */
  previous: abstractions.patterns.IdRef<Commit>;
  userId: string;
}
