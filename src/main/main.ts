import { fileURLToPath } from 'url';
import { argv } from 'process';
import { is_promise } from 'razomy/async/promise';
import { format_time_length } from 'razomy/dates/dates';

export function is_main(moduleUrl) {
  const module_path = fileURLToPath(moduleUrl);
  const [_bin_path, main_script_path] = argv;
  return module_path === main_script_path;
}

export async function on_main(moduleUrl, callback) {
  const path = `${moduleUrl} onMain`;
  const start_date = Date.now();
  try {
    if (is_main(moduleUrl)) {
      console.log(`${path}.start`);
      const void_or_promise = callback();
      if (is_promise(void_or_promise)) {
        await void_or_promise;
      }
      const end_date = Date.now();
      const print_date = format_time_length(end_date - start_date);
      console.log(`${path}.finish time:${print_date}`);
    } else {
      console.log(`${path}.skip`);
    }
  } catch (e) {
    console.log(`${path}.error`);
    throw e;
  }
}
