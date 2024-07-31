export interface IFactory<T> {
  create(args?: any): T;
}