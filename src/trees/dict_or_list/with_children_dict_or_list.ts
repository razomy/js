import {WithChildrenDict} from "razomy.js/trees/dict/with_children_dict";
import {WithChildrenList} from "razomy.js/trees/list/with_children_list";

type WithChildrenDictOrList<T> = WithChildrenList<T> | WithChildrenDict<T>
