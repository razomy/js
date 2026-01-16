import {WithChildrenDict} from 'razomy.tree/dict/with_children_dict';
import {WithChildrenList} from 'razomy.tree/list/with_children_list';

export type WithChildrenDictOrList<T> = WithChildrenList<T> | WithChildrenDict<T>
