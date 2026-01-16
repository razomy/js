import {IResource} from 'razomy.resources/i_resource';
export interface Gate<T extends IResource> {
    get(): T;

    set(resource: T);
}