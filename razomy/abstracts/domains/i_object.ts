import type { WithId } from './with_id';

import type { WithType } from './with_type';

//TODO:rename
export interface IObject extends WithId, WithType {}

export interface IObjectConstructor extends WithType {}
