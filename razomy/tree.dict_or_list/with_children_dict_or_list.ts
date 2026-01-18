import {WithChildrenDict} from 'razomy.tree.dict';
import {WithChildrenList} from 'razomy.tree.list';

export type WithChildrenDictOrList<T> = WithChildrenList<T> | WithChildrenDict<T>
