import {NotImplementedException} from '@razomy/exceptions';
import {type Constructor} from '@razomy/class';
import {EntityResource, ObjectResource} from '@razomy/resources';

export interface INodeResourceCollection {
  nodes?: EntityResource[];
}

export interface IResourceCollection<T extends EntityResource> {

  getAll(): T[];

  add(node: T): void;

  removeAll(): void;

  removeAllBy(node: Constructor<T>): void;

}

export class ResourceCollection<T extends EntityResource> extends ObjectResource implements IResourceCollection<T> {

  public nodes: T[];

  constructor();
  constructor(nodes: T[]);
  constructor(...nodes: T[]);
  constructor(...args: any) {
    super();

    if (args === undefined || args.length === 0) {
      this.nodes = [];
      return;
    }

    if (args.length === 1 && Array.isArray(args[0])) {
      this.nodes = args[0];
      return;
    }

    this.nodes = args;
  }

  public add(node: T): void {
    this.nodes.push(node);
  }

  public getAll(): T[] {
    return this.nodes;
  }

  public removeAll(): void {
    throw new NotImplementedException();
  }

  public removeAllBy(node: Constructor<T>): void {
    throw new NotImplementedException();
  }

}
