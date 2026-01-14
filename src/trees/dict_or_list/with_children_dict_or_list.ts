import {WithChildrenDict} from "razomy.trees/dict/with_children_dict";
import {WithChildrenList} from "razomy.trees/list/with_children_list";

export type WithChildrenDictOrList<T> = WithChildrenList<T> | WithChildrenDict<T>
