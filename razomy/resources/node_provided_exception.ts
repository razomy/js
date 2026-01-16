import {Constructor} from 'razomy.class';
import {Resource} from 'razomy.resources/resource';

export class NodeProvidedException extends Error {

}

export class NodeAlreadyProvidedException extends Error {

}

export interface IResourceMap {
  [key: string]: Resource;
}

export interface IEntityResourceMap {
  resources: IResourceMap;
}

export interface IEntityResource {

  add<T extends Resource>(obj: T): void;

  remove<T extends Resource>(obj: T): void;

  replace<T extends Resource>(obj: T): void;

  get_by<T extends Resource>(objCtor: Constructor<T>): T;
}

