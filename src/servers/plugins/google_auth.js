export const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');

export const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
export const isAuthenticated = ensureLogIn();

const CustomStrategy = require('passport-custom').Strategy;

global.nodejserver.google = {
  async auth(req, res) {
    const csrf_token_cookie = req.body.credential;

    const CLIENT_ID = '104553962015-q818tj1upgha4bhfnepfn37s1lfmcvvc.apps.googleusercontent.com';
    const client = new OAuth2Client(CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: csrf_token_cookie,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();

    if (!payload.email_verified) {
      return null;
    }

    return {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };
  },
};

passport.use('google-tap-on', new CustomStrategy(
  async function(req, callback) {
    const csrf_token_cookie = req.cookies.g_csrf_token;
    if (!csrf_token_cookie) {
      this.fail(400, 'No CSRF token in Cookie.');
      return;
    }

    const csrf_token_body = req.body.g_csrf_token;
    if (!csrf_token_body) {
      this.fail(400, 'No CSRF token in post body.');
      return;
    }

    if (csrf_token_cookie !== csrf_token_body) {
      this.fail(400, 'Failed to verify double submit cookie.');
      return;
    }

    const res = await nodejserver.google.auth(req);
    if (!res) {
      this.fail(400, 'Failed to Auth check.');
      return;
    }

    callback(null, {
      name: res.name,
      email: res.email,
      picture: res.picture,
    });
  },
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export function passportAdd(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/api/auth/sign/google', passport.authenticate('google-tap-on', { failureRedirect: '/login' }), (rq, rs) => rs.redirect('/'));
  app.get('/api/auth/get', (req, res) => {
    if (req.isAuthenticated()) {
      return res.sendStatus(200);
    }
    return res.sendStatus(403);
  });
};
