import { IGuid } from './IGuid.js';
import { IType } from './IType.js';

export interface IObject extends IGuid, IType {
}

export interface IObjectConstructor extends IType {
}
