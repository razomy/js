export interface IObjectClone {
    clone<T extends Object>(obj: T): T;
}
