import type {Constructor} from '@razomy/class';
import {ObjectResource} from '@razomy/resources';

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

  getBy<T extends ObjectResource>(objCtor: Constructor<T>): T;
}

