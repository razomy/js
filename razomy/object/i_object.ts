import * as abstractions from '@razomy/abstractions';

//TODO:rename
export interface IObject extends abstractions.patterns.HasId {
  type:string
}

export interface IObjectConstructor {type:string}
