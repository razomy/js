import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
// import helmet from 'helmet';
import {logger} from 'razomy/servers/logger';
import {Ctx} from 'razomy/express/ctx';
import {echo} from 'razomy/servers/echo';

export {shutdown_function} from 'razomy/servers/shutdown_function';

export function create(ctx: Ctx) {
  ctx.logger = logger;

  const app = express();
  ctx.app = app;
  ctx.isProdSecure = process.env.NODE_ENV === 'production';

// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       'script-src': ['\'self\'', 'https://accounts.google.com/gsi/client', 'https://pagead2.googlesyndication.com/pagead'],
//       'default-src': ['\'self\''],
//       'font-src': ['\'self\''],
//       'img-src': ['\'self\''],
//       'style-src': ['\'self\' https: \'unsafe-inline\''],
//       'connect-src': ['\'self\'', 'https://accounts.google.com/gsi/status', 'https://accounts.google.com/gsi/log'],
//       'frame-src': ['\'self\'', 'https://www.youtube.com', 'https://docs.google.com', 'https://accounts.google.com'],
//     },
//   },
//   referrerPolicy: {
//     policy: 'strict-origin-when-cross-origin',
//   },
// }));

// TODO:user typing and  websocket connection requeres another way of securing
// app.use(rateLimit({
//   windowMs: 50,
//   max: 1,
// }));

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.text({limit: '50mb'}));
  app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
  app.use(cookieParser());
  app.use(methodOverride());

  app.use(cors());
  app.options('*', cors());


  ctx.server = app.listen(8080);

  app.get('/api/echo', echo());

// app.use(express.static('public'));

  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('System error!');
  });
  return ctx;
}