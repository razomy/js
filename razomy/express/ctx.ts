import winston from 'winston';
import type { Express } from 'express';
import * as server from '@razomy/server';
import * as expressAuth from "@razomy/express-auth";

export interface Ctx extends server.WithServer, server.WithUrl {
  isProdSecure: boolean;
  google: expressAuth.googleAuth.Google;
  app: Express;
  logger: winston.Logger;
}
