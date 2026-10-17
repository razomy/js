import * as abstractions from '@razomy/abstractions';

//TODO:rename
export interface IObject extends abstractions.patterns.HasId {
  type:string
}

export interface IObjectConstructor {type:string}

export const LATE_INIT = '__LATE_INIT__' as any;
