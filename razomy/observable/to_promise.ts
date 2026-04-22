import * as observable from '@razomy/observable';

export function toPromise<T>(observable: observable.Observable<T>) {
  return new Promise<T>((resolve, reject) => {
    observable.next = (data) => {
      observable.dispose();
      resolve(data);
    };
    observable.exception = (e) => {
      observable.dispose();
      reject(e);
    };
    observable.execute();
  });
}
