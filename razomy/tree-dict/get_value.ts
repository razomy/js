import * as exceptions from '@razomy/exceptions';
import * as treeDict from '@razomy/tree-dict';
import * as abstractions from "@razomy/abstractions";

export function getValue<T extends abstractions.graph.HasChildrenDict<T>>(value: T, path: string[], offset: number) {
  for (const key in value.children) {
    if (key !== path[offset]) {
      continue;
    }

    return treeDict.get(value.children[key], path, offset + 1);
  }

  throw new exceptions.ArgumentException('Node not found path.invalid arguments', { value, path, offset });
}
