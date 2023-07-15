global.nodejserver = {};
import express from 'express';
import expressWs from 'express-ws';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';


import { logger } from './servers/plugins/logger.js';
export { shutdownFunction } from './servers/plugins/shutdownFunction.js';

import cors from 'cors';
import { DatastoreStore } from '@google-cloud/connect-datastore';
import { Datastore } from '@google-cloud/datastore';
import { isAuthenticated, passport, passportAdd } from './servers/plugins/google_auth.js';

import session from 'express-session';

export { isAuthenticated, passport, passportAdd } from './servers/plugins/google_auth.js';


nodejserver.cors = {
  frameSrc: ['https://www.youtube.com', 'https://docs.google.com', 'https://accounts.google.com'],
  sockets: ['https://play.google.com'],
  scriptSrc: ['https://accounts.google.com/gsi/client'],
  connectSrc: ['https://accounts.google.com/gsi/status', 'https://accounts.google.com/gsi/log'],
};

nodejserver.logger = logger;


const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.text({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(methodOverride());
app.use(cors());
const isProdSecure = process.env.NODE_ENV === 'production';
app.use(session({
  proxy: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, secure: false, httpOnly: true },
  store: new DatastoreStore({
    kind: 'express-sessions',
    expirationMs: 1000 * 60 * 60 * 24 * 31,
    dataset: new Datastore(),
  }),
  saveUninitialized: true,
  resave: true,
  secret: 'keyboard cat 6 12',
}));

app.options('*', cors());
expressWs(app);

app.use(function(req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    `default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self' ${nodejserver.cors.scriptSrc.join(' ')}; connect-src 'self' ${nodejserver.cors.connectSrc.join(' ')}; style-src 'self' https: 'unsafe-inline'; frame-src 'self' ${nodejserver.cors.frameSrc.join(' ')}`,
  );
  next();
});

// const Waf = require('mini-waf/wafbase');
// const wafrules = require('mini-waf/wafrules');
// app.use(Waf.WafMiddleware(wafrules.DefaultSettings));

passportAdd(app);

app.use(express.static('public'));
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('System error!');
});

app.get('/api/echo', function(req, res) {
  res.send('Hello World');
});

const server = app.listen(8080);

nodejserver.app = app;
nodejserver.server = server;
