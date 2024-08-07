import winston from 'winston';
import {Express} from 'express';
import {google} from 'razomy.js/google/auth/google_auth';
import {WithServer, WithUrl} from "razomy.js/servers/server";

export interface Ctx extends WithServer, WithUrl {
  isProdSecure: boolean;
  google: google;
  app: Express;
  logger: winston.Logger;
}
