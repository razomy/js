import create_by_path from "razomy.kv/create_by_path";
import set from "razomy.kv/set";
import { ArrayKeyValuable } from "razomy.kv/kv";
import get from './get';

export function get_with_path<T>(value_recursive: ArrayKeyValuable<T, T>, path: T[]) {
    const pathed = create_by_path(path) as ArrayKeyValuable<T, T>;
    const node = get(value_recursive, path, 0);
    set(pathed, path, node);
    return pathed;
}
