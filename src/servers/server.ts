import http from 'http';

export interface WithServer {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
}

export interface WithUrl {
  url: string
}
