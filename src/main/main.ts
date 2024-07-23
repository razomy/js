import { fileURLToPath } from 'url';
import { argv } from 'process';
import { isPromise } from '../async/promise.js';
import { formatTimeLength } from '../dates/dates.js';

export function isMain(moduleUrl) {
  const modulePath = fileURLToPath(moduleUrl);
  const [_binPath, mainScriptPath] = argv;
  return modulePath === mainScriptPath;
}

export async function onMain(moduleUrl, callback) {
  const path = `${moduleUrl} onMain`;
  const startDate = Date.now();
  try {
    if (isMain(moduleUrl)) {
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
