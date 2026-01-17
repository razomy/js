export interface RemoveDeltaString {
  removeLength: number,
  offset: number,
}

export interface AddDeltaString {
  addValue: string,
  offset: number,
}

export type DeltaString = RemoveDeltaString | AddDeltaString;
