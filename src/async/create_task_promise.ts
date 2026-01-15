export function create_task_promise<T>(task: (() => T) | (() => Promise<T>)): () => Promise<T> {
  return () => new Promise(async (resolve, reject) => {
    try {
      if (task instanceof Promise) {
        resolve(await task());
      } else if (task instanceof Function) {
        resolve(task());
      } else {
        throw new Error('Unknown Task type');
      }
    } catch (error) {
      reject(error);
    }
  });
}