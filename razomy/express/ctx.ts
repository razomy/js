import winston from 'winston';
import {Express} from 'express';
import {Google} from 'razomy.google.auth';
import {WithServer, WithUrl} from 'razomy.server';

export interface Ctx extends WithServer, WithUrl {
  isProdSecure: boolean;
  google: Google;
  app: Express;
  logger: winston.Logger;
}
