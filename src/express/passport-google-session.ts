import { DatastoreStore } from '@google-cloud/connect-datastore';
import { Datastore } from '@google-cloud/datastore';
import  {google, googleTapOn } from 'razomy.js/google/auth/google_auth.js';
import session from 'express-session';
import passport from 'passport';

export function googleSesionApi(ctx) {
  ctx.app.use(session({
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

  ctx.app.use(passport.initialize());
  ctx.app.use(passport.session());

  ctx.app.get('/api/auth/get', (req, res) => {
    if (req.isAuthenticated()) {
      return res.sendStatus(200);
    }
    return res.sendStatus(403);
  });


// API section
  ctx.google = new google(ctx);

  ctx.app.post('/api/auth/sign/google',
    passport.authenticate(googleTapOn, { failureRedirect: '/login' }),
    (rq, rs) => rs.redirect('/'));

}
