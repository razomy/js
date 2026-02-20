import type {WithChildrenDict} from '@razomy/tree-dict';
import type {WithChildrenList} from '@razomy/tree-list';

export type WithChildrenDictOrList<T> = WithChildrenList<T> | WithChildrenDict<T>
