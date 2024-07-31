
export interface IObjectClone {
    clone<T extends object>(obj: T): T;
}
