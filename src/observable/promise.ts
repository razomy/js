import {Observable} from "razomy/observable/observable";

function promise<T>(observable: Observable<T>) {
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

export default promise;
