export function thread_sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function delay(ms: number): Promise<void> {
  return thread_sleep(ms);
}

export function is_promise(p: any): boolean {
  if (typeof p === 'object' && typeof p.then === 'function') {
    return true;
  }

  return false;
}

export function wait_async(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(seconds); // or you can use reject() to reject the promise
    }, seconds); // convert seconds to milliseconds
  });
}

export async function try_async(fn) {
  try {
    return await fn;
  } catch (e) {
    console.log(e);
  }
}
