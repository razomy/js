import * as exceptions from '@razomy/exceptions';
import * as object_ from '@razomy/object';
import * as resources from '@razomy/resources';

export interface INodeResourceCollection {
  nodes?: resources.EntityResource[];
}

export interface IResourceCollection<T extends resources.EntityResource> {
  getAll(): T[];

  add(node: T): void;

  removeAll(): void;

  removeAllBy(node: object_.Constructor<T>): void;
}

export class ResourceCollection<T extends resources.EntityResource>
  extends resources.AObjectResource
  implements IResourceCollection<T>
{
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
    throw new exceptions.NotImplementedException();
  }

  public removeAllBy(node: object_.Constructor<T>): void {
    throw new exceptions.NotImplementedException();
  }
}
