export interface HasParent<T extends HasParent = any> {
  parent: T | null;
}
