import { type Resource } from './resource';
import * as socketWeb from '@razomy/socket';
import * as abstractions from '@razomy/abstractions';
// @ts-ignore
export declare module '@razomy/abstractions/meta' {
  export interface Razomy extends socketWeb.client.HasWebsocket, abstractions.components.HasUrl {
    id: string;
    resource: Resource;
    rG: (string: string) => string;
  }
}
