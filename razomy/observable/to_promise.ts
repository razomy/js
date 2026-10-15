import * as abstractions from "@razomy/abstractions";

export function toPromise<T>(observable: abstractions.patterns.IObservable<T>) {
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
