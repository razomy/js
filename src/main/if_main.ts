import {format_time_length} from 'razomy.dates/format_time_length';
import {is_promise} from 'razomy.async/is_promise';
import {is_main} from './is_main';
import {AsyncCallback, Callback} from 'razomy.action/action';

export async function if_main(import_meta_url_or_module_path: string, callback: Callback | AsyncCallback) {
  const path = `${import_meta_url_or_module_path}.if_main`;
  const start_date = Date.now();
  try {
    if (is_main(import_meta_url_or_module_path)) {
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
