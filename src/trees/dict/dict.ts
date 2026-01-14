import {WithChildrenDict} from "razomy.trees/dict/with_children_dict";
import {Leaf} from "razomy.trees/leaf";

export interface BranchDict<T, R = BranchDictOrLeaf<T>> extends RootDict<T, R> {
  value: string
}

export type BranchDictOrLeaf<T> = BranchDict<T> | Leaf<T>
export type RootOrBranchDict<T> = RootDict<T> | BranchDict<T>
export type RootDictOrLeaf<T> = RootDict<T> | Leaf<T>

export interface RootDict<T, R = unknown> extends WithChildrenDict<R> {
}

export function map_branch<I, O>(
  parent: RootDict<O>,
  input: BranchDictOrLeaf<I>,
  leaf_value_cb: (input: Leaf<I>, parent: RootOrBranchDict<I>) => O
): BranchDictOrLeaf<O> {
  if ('children' in input) {

    const otput: BranchDict<O> = {
      value: input.value,
      children: {}
    };
    for (let input_key in input.children) {
      const value = input[input_key];
      otput[input_key] = map_branch(otput, value, leaf_value_cb)
    }

    return otput;
  } else {
    return {
      value: leaf_value_cb(input, parent)
    }
  }
}

export function map_root<I, O>(
  input: RootDict<I>,
  leaf_value_cb: (input: Leaf<I>, parent: RootOrBranchDict<I>) => O
) {
  const otput: RootDict<O> = {
    children: {}
  };
  for (let input_key in input.children) {
    const value = input[input_key];
    otput[input_key] = map_branch(otput, value, leaf_value_cb)
  }
  return otput;
}
