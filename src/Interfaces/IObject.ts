import { IGuid } from '../Interfaces/IGuid';
import { IType } from '../Interfaces/IType';

export interface IObject extends IGuid, IType {
}

export interface IObjectConstructor extends IType {
}
