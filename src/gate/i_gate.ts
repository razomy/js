import {IResource} from "razomy/resources/i_resource";

export interface IGate<T extends IResource> {
    get(): T;

    set(resource: T);
}