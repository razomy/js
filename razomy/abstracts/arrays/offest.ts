export type OutIndex = -1;
export type Index = number;
export type IndexOrOut = Index | OutIndex;

export type Offset = number;

export interface WithOffset {
  offset: Offset;
}

export interface WithPrevOffset {
  prevOffset: Offset;
}
