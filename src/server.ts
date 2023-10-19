import express, { Express } from 'express';
import expressWs from 'express-ws';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import { DatastoreStore } from '@google-cloud/connect-datastore';
import { Datastore } from '@google-cloud/datastore';
import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';

import { logger } from './servers/logger.js';
import google, { googleTapOn } from './auths/google_auth.js';
import { Ctx } from './ctx.js';
import { echo } from './servers/echo.js';

export { shutdownFunction } from './servers/shutdownFunction.js';

const ctx: Ctx = {} as any;

ctx.logger = logger;

const app = express() as (Express & { ws: expressWs.Application });
ctx.app = app;
ctx.isProdSecure = process.env.NODE_ENV === 'production';
ctx.google = new google(ctx);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'script-src': ['\'self\'', 'https://accounts.google.com/gsi/client'],
      'default-src': ['\'self\''],
      'font-src': ['\'self\''],
      'img-src': ['\'self\''],
      'style-src': ['\'self\' https: \'unsafe-inline\''],
      'connect-src': ['\'self\'', 'https://accounts.google.com/gsi/status', 'https://accounts.google.com/gsi/log'],
      'frame-src': ['\'self\'', 'https://www.youtube.com', 'https://docs.google.com', 'https://accounts.google.com'],
    },
  },
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
}));

// TODO:user typing and  websocket connection requeres another way of securing
// app.use(rateLimit({
//   windowMs: 50,
//   max: 1,
// }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.text({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(methodOverride());
app.use(cors());
app.use(session({
  proxy: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 31, secure: false, httpOnly: true },
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
ctx.ws = app.ws;

app.use(passport.initialize());
app.use(passport.session());

ctx.server = app.listen(8080);

// API section

app.post('/api/auth/sign/google',
  passport.authenticate(googleTapOn, { failureRedirect: '/login' }),
  (rq, rs) => rs.redirect('/'));

app.get('/api/auth/get', (req, res) => {
  if (req.isAuthenticated()) {
    return res.sendStatus(200);
  }
  return res.sendStatus(403);
});


app.get('/api/echo', echo());

app.use(express.static('public'));

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('System error!');
});


export default ctx;
