import {Observable} from '@razomy/observable';

export function promise<T>(observable: Observable<T>) {
  return new Promise<T>((resolve, reject) => {
    observable.next = ((data) => {
      observable.dispose();
      resolve(data);
    });
    observable.exception = ((e) => {
      observable.dispose();
      reject(e);
    });
    observable.execute();
  });
}


