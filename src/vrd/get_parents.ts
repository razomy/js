import { ArgumentException } from 'razomy.exceptions/argument_exception';
import { VrdOrValue } from 'razomy.vrd/vrd';
import { DictKey } from 'razomy.dict/dict';
export function get_parents<T>(value_recursive: VrdOrValue<T>, path: DictKey[], path_offset: number): VrdOrValue<T>[] {
    for (let key in value_recursive!) {
    if (key !== path[path_offset]) {
      continue;
    }
    path_offset += 1;

    if (path_offset >= path.length) {
      return [value_recursive];
    }

    return [value_recursive, ...get_parents(value_recursive[key], path, path_offset)]
    }

    throw new ArgumentException('invalid arguments', {value_recursive, path, path_offset})
}
