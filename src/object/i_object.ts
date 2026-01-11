import { WithId }  from 'razomy/id/i_guid';
import { IType }  from 'razomy/types/i_type';

export interface IObject extends WithId, IType {
}

export interface IObjectConstructor extends IType {
}
