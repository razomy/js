import winston from 'winston';
import {Express} from 'express';
import * as http from 'http';
import {google} from 'razomy.js/google/auth/google_auth';

export interface WithServer {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
}

export interface WithUrl {
  url: string
}

export interface Ctx extends WithServer, WithUrl {
  isProdSecure: boolean;
  google: google;
  app: Express;
  logger: winston.Logger;
}
