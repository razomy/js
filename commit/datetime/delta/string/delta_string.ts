export interface RemoveDeltaString {
  remove_length: number,
  offset: number,
}

export interface AddDeltaString {
  add_value: string,
  offset: number,
}

export type DeltaString = RemoveDeltaString | AddDeltaString;
