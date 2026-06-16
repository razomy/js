import http from 'http';

export interface HasServer {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
}

export interface HasUrl {
  url: string;
}
