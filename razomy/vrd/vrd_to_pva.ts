import type { VrdOrValue } from './vrd';
import { isVrd } from './is_vrd';
import * as abstracts from "@razomy/abstracts";

export function vrdToPva<T>(input: VrdOrValue<T>, absolutePath: abstracts.graphs.AbsolutePathString, separator: string) {
  const result: { path: abstracts.graphs.AbsolutePathString; value: T }[] = [];
  const stack: { path: abstracts.graphs.AbsolutePathString; vrd: VrdOrValue<T> }[] = [{ vrd: input, path: absolutePath }];

  while (stack.length > 0) {
    const { vrd, path } = stack.pop()!;
    const keys = Object.keys(vrd as any);
    if (keys.length === 0) {
      result.push({ path: path, value: null as any });
    }
    for (const inputKey of keys) {
      const vrdOrValue = vrd[inputKey];

      // Calculate the new prefix
      const newPrefix = path ? path + separator + inputKey : inputKey;

      // If the value is a nested Vrd, push it onto the stack to process its children
      if (isVrd(vrdOrValue)) {
        stack.push({
          vrd: vrdOrValue,
          path: newPrefix,
        });
      } else {
        result.push({ path: newPrefix, value: vrdOrValue });
      }
    }
  }

  return result;
}
