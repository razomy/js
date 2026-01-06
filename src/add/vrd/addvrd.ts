import {VrdOrValue} from 'razomy.js/vrd/vrd';

export interface RemoveDeltaVrd {
  afterPath: string[],
  remove: true,
  path: number,
}

export interface AddDeltaVrd {
  afterPath: string[],
  add: VrdOrValue<string>,
  path: string[],
}

export type DeltaVrd = RemoveDeltaVrd | AddDeltaVrd;


export interface ActorDatetimeDeltaVrd {
  datetime: string,
  actor: string,
  deltas: DeltaVrd[],
}
