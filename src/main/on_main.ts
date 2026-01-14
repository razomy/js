import format_time_length from 'razomy.dates/format_time_length';
import is_ from 'razomy.async/is_';
import is_main from './is_main';

export default async function on_main(moduleUrl, callback) {
    const path = `${moduleUrl} onMain`;
    const start_date = Date.now();
    try {
    if (is_main(moduleUrl)) {
      console.log(`${path}.start`);
      const void_or_promise = callback();
      if (is_(void_or_promise)) {
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
