export interface Leaf<T> {
  isLeaf: true
  value: T
}

export interface Branch<T> {
  isLeaf: false
  children: T
}


export type LeafTree<T> = {
  [key: string]: Leaf<T> | Branch<LeafTree<T>>
}

export function mapLeafTree<I, O>(input: LeafTree<I>, cb: (key: string, input: I) => O): LeafTree<O> {
  const otput: LeafTree<O> = {};
  for (let inputKey in input) {
    const value = input[inputKey];
    if (value.isLeaf) {
      otput[inputKey] = {
        isLeaf: true,
        value: cb(inputKey, value.value),
      }
    } else {
      otput[inputKey] = {
        isLeaf: false,
        children: mapLeafTree(value.children, cb)
      }
    }
  }
  return otput;
}
