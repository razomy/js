export function threadSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isPromise(p) {
  if (typeof p === 'object' && typeof p.then === 'function') {
    return true;
  }

  return false;
}
