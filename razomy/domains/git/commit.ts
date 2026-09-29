import * as domains from "@razomy/domains";
import * as abstracts from "@razomy/abstracts";

export enum DifferenceType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

/**
 * @index createdAt
 * @index createdAt
 */
export interface Commit extends domains.identitys.UserChild, abstracts.domains.CudDateTime{
  entity: abstracts.graphs.KeyEdge<domains.AnyEntityType>;

  differenceType: DifferenceType;
  difference: abstracts.domains.Json;
  /** @uniq */
  commitHash: string;
  /** @uniq */
  previous: abstracts.domains.IdRef<Commit>;
  userId: string;
}
