import type { WithValue } from '@razomy/abstracts/domains';
import type { WithChildrenList } from '@razomy/tree-list';

export interface ListTree<T> extends WithValue<T>, WithChildrenList<ListTree<T>> {}
