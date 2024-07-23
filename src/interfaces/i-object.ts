import { IGuid } from './i-guid';
import { IType } from './i-type';

export interface IObject extends IGuid, IType {
}

export interface IObjectConstructor extends IType {
}