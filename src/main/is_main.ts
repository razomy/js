import { fileURLToPath } from 'url';
import {argv} from 'process';

export function is_main(moduleUrl) {
  const module_path = fileURLToPath(moduleUrl);
  const [_bin_path, main_script_path] = argv;
  return module_path === main_script_path;
}
