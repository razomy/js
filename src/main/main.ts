import { fileURLToPath } from 'url';
import { argv } from 'process';
import { is_promise } from 'razomy/async/promise';
import { format_time_length } from 'razomy/dates/dates';

export function is_main(moduleUrl) {
  const modulePath = fileURLToPath(moduleUrl);
  const [_binPath, mainScriptPath] = argv;
  return modulePath === mainScriptPath;
}

export async function on_main(moduleUrl, callback) {
  const path = `${moduleUrl} onMain`;
  const startDate = Date.now();
  try {
    if (is_main(moduleUrl)) {
      console.log(`${path}.start`);
      const voidOrPromise = callback();
      if (is_promise(voidOrPromise)) {
        await voidOrPromise;
      }
      const endDate = Date.now();
      const printDate = format_time_length(endDate - startDate);
      console.log(`${path}.finish time:${printDate}`);
    } else {
      console.log(`${path}.skip`);
    }
  } catch (e) {
    console.log(`${path}.error`);
    throw e;
  }
}
