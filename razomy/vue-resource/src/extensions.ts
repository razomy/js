import { type Resource } from './resource';
import * as socketWeb from '@razomy/socket';
import * as server from '@razomy/server';

// @ts-ignore
export declare module '@razomy/abstractions/meta' {
  export interface Razomy extends socketWeb.client.HasWebsocket, server.HasUrl {
    id: string;
    resource: Resource;
    rG: (string: string) => string;
  }
}
