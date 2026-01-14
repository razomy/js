import { VrdOrValue } from "razomy.vrd/vrd";
import path_to_vrd from "razomy.vrd/path_to_vrd";
import set_vrd from "razomy.vrd/set_vrd";
import get_vrd from './get_vrd';

export function get_with_path<T>(value_recursive: VrdOrValue<T>, path: string[]) {
    const pathed = path_to_vrd(path);
    const node = get_vrd(value_recursive, path, 0);
    set_vrd(pathed, path, node);
    return pathed;
}
