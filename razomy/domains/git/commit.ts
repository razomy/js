import * as domains from "@razomy/domains";
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
export interface Commit extends domains.identitys.UserChild, abstractions.components.CrudDateTime{
  entity: abstractions.graphs.KeyEdge<domains.AnyEntityType>;

  differenceType: DifferenceType;
  difference: abstractions.patterns.Json;
  /** @uniq */
  commitHash: string;
  /** @uniq */
  previous: abstractions.patterns.IdRef<Commit>;
  userId: string;
}
