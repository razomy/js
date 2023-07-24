import winston from 'winston';
import { Express } from 'express';
import * as http from 'http';
import google from './servers/plugins/google_auth';
import expressWs from 'express-ws';

export interface Ctx {
  ws: expressWs.Application;
  google: google;
  app: Express;
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  logger: winston.Logger;
  cors: {
    frameSrc: string[];
    sockets: string[];
    scriptSrc: string[];
    connectSrc: string[];
  };
}
