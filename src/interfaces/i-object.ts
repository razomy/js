import { IGuid } from './i-guid.js';
import { IType } from './i-type.js';

export interface IObject extends IGuid, IType {
}

export interface IObjectConstructor extends IType {
}