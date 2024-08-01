import {ArgumentException} from "razomy.js/exceptions/argument_exception";

export type BranchKey = string

export interface WithValue<T> {
  value: T
}

export interface DictLeaf<T> extends WithValue<T> {
}


export function is_dict_branch_leaf_or_throw<T>(node: DictRootOrBranch<T>): node is DictBranch<T> {
  if ('value' in node) {
    return true;
  }
  throw new ArgumentException("data musst have file name");
}


export interface DictBranch<T> extends DictRoot<T> {
  value: string
  parent: DictRootOrBranch<T>
}

export type DictBranchOrLeaf<T> = DictBranch<T> | DictLeaf<T>
export type DictRootOrBranch<T> = DictRoot<T> | DictBranch<T>
export type DictRootOrLeaf<T> = DictRoot<T> | DictLeaf<T>

export interface DictRoot<T, R extends DictRoot<T, R> = any> {
  children: { [key: BranchKey]: R }
}

export function mapDictBranch<I, O>(
  parent: DictRoot<O>,
  input: DictBranchOrLeaf<I>,
  leaf_value_cb: (input: DictLeaf<I>, parent: DictRootOrBranch<I>) => O
): DictBranchOrLeaf<O> {
  if ('children' in input) {

    const otput: DictBranch<O> = {
      parent: parent,
      value: input.value,
      children: {}
    };
    for (let inputKey in input.children) {
      const value = input[inputKey];
      otput[inputKey] = mapDictBranch(otput, value, leaf_value_cb)
    }

    return otput;
  } else {
    return {
      parent: parent,
      value: leaf_value_cb(input, parent)
    }
  }
}

export function mapDictRoot<I, O>(
  input: DictRoot<I>,
  leaf_value_cb: (input: DictLeaf<I>, parent: DictRootOrBranch<I>) => O
) {
  const otput: DictRoot<O> = {
    children: {}
  };
  for (let inputKey in input.children) {
    const value = input[inputKey];
    otput[inputKey] = mapDictBranch(otput, value, leaf_value_cb)
  }
  return otput;
}
