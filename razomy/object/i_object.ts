import type { WithId } from '../abstracts/domains/with_id';

import type { WithType } from '../abstracts/domains/with_type';

//TODO:rename
export interface IObject extends WithId, WithType {}

export interface IObjectConstructor extends WithType {}
