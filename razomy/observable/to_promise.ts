import * as abstracts from "@razomy/abstracts";

export function toPromise<T>(observable: abstracts.patterns.IObservable<T>) {
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
