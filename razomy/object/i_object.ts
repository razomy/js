import type {WithId} from '@razomy/id';

import type {WithType} from '@razomy/type';

export interface IObject extends WithId, WithType {
}

export interface IObjectConstructor extends WithType {
}
