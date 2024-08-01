import {DictLeaf, DictRoot} from "razomy.js/trees/dict_tree";

export interface WithAbsolutePath {
  absolute_path: string
}

export interface AbsolutePathDictRoot<T> extends DictRoot<T, AbsolutePathDictRoot<T>>, WithAbsolutePath {
}

export type AbsolutePathDictLeaf<T> = DictLeaf<T> & WithAbsolutePath;
export type AbsolutePathDictLeafOrRoot<T> = AbsolutePathDictLeaf<T> | AbsolutePathDictRoot<T>;

export function leafTreeAbsolutePath<T>(input: DictRoot<T>, absolute_path: string): AbsolutePathDictRoot<T>;
export function leafTreeAbsolutePath<T>(input: DictLeaf<T>, absolute_path: string): AbsolutePathDictLeaf<T>;
export function leafTreeAbsolutePath<T>(input: DictRoot<T> | DictLeaf<T>, absolute_path: string): AbsolutePathDictLeafOrRoot<T> {
  const otput = {...input, absolute_path};
  if ('children' in otput) {
    for (let inputKey in otput.children) {
      const value = otput.children[inputKey];
      const newPrefix = absolute_path ? absolute_path + '.' + inputKey : inputKey;
      otput.children[inputKey] = leafTreeAbsolutePath(value, newPrefix)
    }
  }

  return otput;
}