import {VrdOrValue} from 'razomy.vrd/vrd';

export interface RemoveDeltaVrd {
  after_path: string[],
  remove: true,
  path: number,
}

export interface AddDeltaVrd {
  after_path: string[],
  add: VrdOrValue<string>,
  path: string[],
}

export type DeltaVrd = RemoveDeltaVrd | AddDeltaVrd;


export interface ActorDatetimeDeltaVrd {
  datetime: string,
  actor: string,
  deltas: DeltaVrd[],
}
