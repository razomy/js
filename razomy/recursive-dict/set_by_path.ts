import type { RecursiveDict } from "./recursive";
import { isObject } from "@razomy/object";

export function setByPath(obj: RecursiveDict, path: string, value: any): void {
    const parts = path.split('.');
    const last = parts.pop();
    if (!last) return;
    const target = parts.reduce((acc, part) => {
            if (!acc[part] || !isObject(acc[part])) acc[part] = {};
            return acc[part];
          }, obj);
    target[last] = value;
}
