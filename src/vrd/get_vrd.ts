import {ArgumentException} from 'razomy.exceptions/argument_exception';
import {VrdOrValue} from 'razomy.vrd/vrd';
import {DictKey} from 'razomy.dict/dict';
export default function get_vrd<T>(value_recursive: VrdOrValue<T>, path: DictKey[], path_offset: number): VrdOrValue<T> {
  for (let key in value_recursive!) {
    if (key !== path[path_offset]) {
      continue;
    }
    path_offset += 1;

    if (path_offset >= path.length) {
      return value_recursive[key];
    }

    return get_vrd(value_recursive[key], path, path_offset)
  }

  throw new ArgumentException('invalid arguments', {value_recursive, path, path_offset})
}



export * from './get_with_path';export * from './get_matches_key';export * from './get_parents';