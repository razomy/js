import winston from 'winston';
import { Express } from 'express';
import * as http from 'http';
import google from '../auths/google_auth.js';
import expressWs from 'express-ws';

export interface Ctx {
  isProdSecure: boolean;
  ws: expressWs.Application;
  google: google;
  app: Express;
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  logger: winston.Logger;
}
