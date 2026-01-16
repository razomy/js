import {WithValue} from 'razomy.value/with_value';
import {WithChildrenList} from 'razomy.tree/list/with_children_list';

export interface ListTree<T> extends WithValue<T>, WithChildrenList<ListTree<T>> {

}