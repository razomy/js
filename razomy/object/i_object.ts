import {WithId} from 'razomy.id';

import {WithType} from 'razomy.type';

export interface IObject extends WithId, WithType {
}

export interface IObjectConstructor extends WithType {
}
