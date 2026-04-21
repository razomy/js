import winston from 'winston';
import type { Express } from 'express';
import * as googleAuth from '../express-auth/google-auth';
import * as server from '@razomy/server';

export interface Ctx extends server.WithServer, server.WithUrl {
  isProdSecure: boolean;
  google: googleAuth.Google;
  app: Express;
  logger: winston.Logger;
}
