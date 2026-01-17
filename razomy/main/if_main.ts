import {formatTimeLength} from 'razomy.dates/format_time_length';
import {isPromise} from 'razomy.async/is_promise';
import {isMain} from './is_main';
import {AsyncCallback, Callback} from 'razomy.action/action';

export async function ifMain(importMetaUrlOrModulePath: string, callback: Callback | AsyncCallback) {
  const path = `${importMetaUrlOrModulePath}.if_main`;
  const startDate = Date.now();
  try {
    if (isMain(importMetaUrlOrModulePath)) {
      console.log(`${path}.start`);
      const voidOrPromise = callback();
      if (isPromise(voidOrPromise)) {
        await voidOrPromise;
      }
      const endDate = Date.now();
      const printDate = formatTimeLength(endDate - startDate);
      console.log(`${path}.finish time:${printDate}`);
    } else {
      console.log(`${path}.skip`);
    }
  } catch (e) {
    console.log(`${path}.error`);
    throw e;
  }
}
