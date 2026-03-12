import * as dict from '@razomy/dict';

export interface DictRecursive extends dict.Dict<DictRecursive> {}
