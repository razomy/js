import {WithValue} from '@razomy/value';
import {WithChildrenList} from '@razomy/tree.list';

export interface ListTree<T> extends WithValue<T>, WithChildrenList<ListTree<T>> {

}