import { WithId }  from 'razomy.id/with_id';

import {WithType} from 'razomy.type';

export interface IObject extends WithId, WithType {
}

export interface IObjectConstructor extends WithType {
}
