export interface WithParent<T extends WithParent = any> {
  parent: T | null;
}
