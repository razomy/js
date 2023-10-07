import { fileURLToPath } from 'url';
import { argv } from 'process';
import { isPromise } from './promise';

export function isMain(moduleUrl) {
  const modulePath = fileURLToPath(moduleUrl);
  const [_binPath, mainScriptPath] = argv;
  return modulePath === mainScriptPath;
}

export async function onMain(moduleUrl, callback) {
  if (isMain(moduleUrl)) {
    console.log('onMain.start');
    const voidOrPromise = callback();
    if (isPromise(voidOrPromise)) {
      await voidOrPromise;
    }
    console.log('onMain.finish');
  } else {
    console.log('onMain.skip');
  }
}
