import {Constructor} from 'razomy.class';
import {ObjectResource} from 'razomy.resources/object_resource';

export class NodeProvidedException extends Error {

}

export class NodeAlreadyProvidedException extends Error {

}

export interface IResourceMap {
  [key: string]: ObjectResource;
}

export interface IEntityResourceMap {
  resources: IResourceMap;
}

export interface IEntityResource {

  add<T extends ObjectResource>(obj: T): void;

  remove<T extends ObjectResource>(obj: T): void;

  replace<T extends ObjectResource>(obj: T): void;

  get_by<T extends ObjectResource>(objCtor: Constructor<T>): T;
}

