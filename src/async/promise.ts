export function threadSleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function delay(ms: number): Promise<void> {
  return threadSleep(ms);
}

export function isPromise(p: any): boolean {
  if (typeof p === 'object' && typeof p.then === 'function') {
    return true;
  }

  return false;
}
