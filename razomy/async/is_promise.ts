export function is_promise(p: any): boolean {
  if (typeof p === 'object' && typeof p.then === 'function') {
    return true;
  }

  return false;
}


