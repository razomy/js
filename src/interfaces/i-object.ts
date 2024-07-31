import { IGuid }  from 'razomy.js/interfaces/i-guid';
import { IType }  from 'razomy.js/interfaces/i-type';

export interface IObject extends IGuid, IType {
}

export interface IObjectConstructor extends IType {
}