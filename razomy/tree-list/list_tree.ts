import type {WithValue} from '@razomy/value';
import type {WithChildrenList} from '@razomy/tree-list';

export interface ListTree<T> extends WithValue<T>, WithChildrenList<ListTree<T>> {

}