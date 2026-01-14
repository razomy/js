import {ArgumentException} from 'razomy.exceptions/argument_exception';
import {WithPathString} from 'razomy.path/string/path_string';
import is_mac_ds_store_key from './is_mac_ds_store_key';

export const python_dependencies = ['.venv'];
export const nodejs_dependencies = ['node_modules'];
export const unity_dependencies = ['Library'];

export const known_dependencies = [
  ...python_dependencies,
  ...nodejs_dependencies,
  ...unity_dependencies,
];

export const git_slug = '.git';
export const mac_ds_store_file = '.DS_Store';

export class is_mac_ds_store_key_ArgumentException extends ArgumentException<WithPathString> {
  constructor(path: string) {
    super(is_mac_ds_store_key.name, {path_string: path});
  }
}
