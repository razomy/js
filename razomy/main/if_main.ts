import {formatTimeLength} from '@razomy/dates';
import {isPromise} from '@razomy/async';
import {isMain} from './is_main';
import type {AsyncCallback, Callback} from '@razomy/action';

export async function ifMain(importMetaUrlOrModulePath: string, callback: Callback | AsyncCallback) {
  const path = `${importMetaUrlOrModulePath} if_main`;
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
