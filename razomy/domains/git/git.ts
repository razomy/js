import type {UserChild} from "../identitys/user";
import type { CudDateTime, IdRef } from '@razomy/abstracts/domains';
import type {Json} from "../../abstracts/domains/serializable";
import type {KeyEdge} from "../../abstracts/graphs/edge_list_graph";
import type {AnyEntityType} from "../domian";

export enum DifferenceType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

/**
 * @index createdAt
 * @index createdAt
 */
export interface Commit extends UserChild, CudDateTime{
  entity: KeyEdge<AnyEntityType>;

  differenceType: DifferenceType;
  difference: Json;
  /** @uniq */
  commitHash: string;
  /** @uniq */
  previous: IdRef<Commit>;
  userId: string;
}
