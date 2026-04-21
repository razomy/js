import * as async from '../future';
import * as abstracts from '@razomy/abstracts';
import * as main from '@razomy/main';
import * as datetimes from "@razomy/datetimes";

export async function ifMain(
  importMetaUrlOrModulePath: string,
  callback: abstracts.functions.Callback | abstracts.functions.AsyncCallback,
) {
  const path = `${importMetaUrlOrModulePath} if_main`;
  const startDate = Date.now();
  try {
    if (main.isMain(importMetaUrlOrModulePath)) {
      console.log(`${path}.start`);
      const voidOrPromise = callback();
      if (async.isPromise(voidOrPromise)) {
        await voidOrPromise;
      }
      const endDate = Date.now();
      const printDate = datetimes.formatTimeLength(endDate - startDate);
      console.log(`${path}.finish time:${printDate}`);
    } else {
      console.log(`${path}.skip`);
    }
  } catch (e) {
    console.log(`${path}.error`);
    throw e;
  }
}
