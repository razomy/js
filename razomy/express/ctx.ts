import winston from 'winston';
import type {Express} from 'express';
import type {Google} from '@razomy/google-auth';
import type {WithServer, WithUrl} from '@razomy/server';

export interface Ctx extends WithServer, WithUrl {
  isProdSecure: boolean;
  google: Google;
  app: Express;
  logger: winston.Logger;
}
