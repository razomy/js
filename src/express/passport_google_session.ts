import { DatastoreStore } from '@google-cloud/connect-datastore';
import { Datastore } from '@google-cloud/datastore';
import  {Google, google_tap_on } from 'razomy/google/auth/google_auth';
import session from 'express-session';
import passport from 'passport';

export function google_sesion_api(ctx) {
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
  ctx.google = new Google(ctx);

  ctx.app.post('/api/auth/sign/google',
    passport.authenticate(google_tap_on, { failureRedirect: '/login' }),
    (rq, rs) => rs.redirect('/'));

}
