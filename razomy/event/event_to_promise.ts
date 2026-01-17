export interface Event<T> {
  id: string;
  ctx: T
}

export function eventToPromise<T>(event: { on: (key, cb: (t: T) => void) => void }, key: string): Promise<T> {
  return new Promise(resolve => {
    event.on(key, resolve);
  })
}


