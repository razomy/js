import winston from 'winston';
import type { Express } from 'express';
import * as expressAuthGoogleAuth from '@razomy/express-auth/google-auth';
import * as server from '@razomy/server';

export interface Ctx extends server.WithServer, server.WithUrl {
  isProdSecure: boolean;
  google: expressAuthGoogleAuth.Google;
  app: Express;
  logger: winston.Logger;
}
