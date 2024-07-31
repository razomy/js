export interface Leaf<T> {
  isLeaf: true
  value: T
}

export interface Branch<IterT> {
  isLeaf: false
  children: IterT
}

type LeafBranch<T> = Branch<LeafBranchDict<T>>

export type LeafBranchDict<T> = {
  [key: string]: Leaf<T> | LeafBranch<T>
}

export function mapLeafTreeValue<I, O>(
  input: LeafBranchDict<I>,
  leaf_value_cb: (key: string, input: I) => O
): LeafBranchDict<O> {
  const otput: LeafBranchDict<O> = {};
  for (let inputKey in input) {
    const value = input[inputKey];
    if (value.isLeaf) {
      otput[inputKey] = {
        isLeaf: true,
        value: leaf_value_cb(inputKey, value.value),
      }
    } else {
      otput[inputKey] = {
        isLeaf: false,
        children: mapLeafTreeValue(value.children, leaf_value_cb)
      }
    }
  }
  return otput;
}
