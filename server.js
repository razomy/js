global.nodejserver = {};
const express = require('express');
const expressWs = require('express-ws');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const logger = require('./src/servers/plugins/logger');
const shutdownFunction = require('./src/servers/plugins/shutdownFunction.js');
const { passport, isAuthenticated, passportAdd } = require('./src/servers/plugins/google_auth');
const cors = require('cors');

const {Datastore} = require('@google-cloud/datastore');
const {DatastoreStore} = require('@google-cloud/connect-datastore');

nodejserver.cors = {
  frameSrc: ['https://www.youtube.com', 'https://docs.google.com;'],
  sockets: ['https://play.google.com'],
};

nodejserver.logger = logger;


const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.text({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(methodOverride());
app.use(cors());

const session = require('express-session');

const isProdSecure = process.env.NODE_ENV === 'production';
app.use(session({
  proxy: true,
  cookie: { maxAge: 86400000, secure: false, httpOnly: true },
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
    `default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self' https://accounts.google.com/gsi/client'; style-src 'self' https: 'unsafe-inline'; frame-src 'self' ${nodejserver.cors.frameSrc.join(' ')}`,
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

module.exports = {
  isAuthenticated,
  onShutdown: shutdownFunction,
};
