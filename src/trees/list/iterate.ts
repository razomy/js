import {WithChildrenList} from 'razomy.trees/list/with_children_list';

export default function iterate<T extends WithChildrenList<any>>(node: T, cb: (node: T) => void) {
  cb(node);
  for (const n of node.children) {
    iterate<T>(n, cb);
  }
}



export * from './iterate_reverse';
