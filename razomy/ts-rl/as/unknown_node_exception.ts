import { Node } from 'ts-morph';

export type Produce = <T>(product: T, source?: any) => T;

export interface HasEnterLeaveProduce {
  enter: <T>(product: T, source?: any) => T | boolean | null | undefined;
  leave: <T>(product: T, source?: any) => T;
}

export class UnknownNodeException extends Error {
  constructor(node: Node) {
    super(`Unknown node type:${node.getKindName()}, text:${node.getText()}`);
  }
}