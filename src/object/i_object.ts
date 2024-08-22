import { WithId }  from 'razomy.js/id/i_guid';
import { IType }  from 'razomy.js/types/i_type';

export interface IObject extends WithId, IType {
}

export interface IObjectConstructor extends IType {
}
