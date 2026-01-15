import { WithId }  from 'razomy.id/with_id';

import {WithType} from 'razomy.types';

export interface IObject extends WithId, WithType {
}

export interface IObjectConstructor extends WithType {
}
