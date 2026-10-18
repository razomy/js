export interface HasEnterLeave<T = any> {
  enter: (product: T, source: any) => T | null;
  leave: (product: T, source: any) => T;
}
