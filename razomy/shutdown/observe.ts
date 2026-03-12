import * as observable from '@razomy/observable';

export function observe() {
  return new observable.Observable((resolve) => {
    process.on('SIGINT', resolve);
    return () => process.off('SIGINT', resolve);
  });
}
