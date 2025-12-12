import {WithValue} from 'razomy.js/value/with_value';
import {WithChildrenList} from 'razomy.js/trees/list/with_children_list';

export interface ListTree<T> extends WithValue<T>, WithChildrenList<ListTree<T>> {

}