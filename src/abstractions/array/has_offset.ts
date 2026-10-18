export type Offset = number;

export type OutIndex = -1;
export type Index = number;
export type IndexOrOut = Index | OutIndex;

export type IndexType = 'Btree' | 'Gin' | 'Hash';
export type OrderDirection = 'ASC' | 'DESC';

export interface HasOffset {
  offset: Offset;
}

export interface HasPrevOffset {
  prevOffset: Offset;
}
