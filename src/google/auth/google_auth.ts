import {OAuth2Client} from 'google-auth-library';
import {ensureLoggedIn as ensureLogIn} from 'connect-ensure-login';
import {Strategy as CustomStrategy} from 'passport-custom';
import passport from 'passport';

export const is_authenticated = ensureLogIn();
export const google_tap_on = 'google-tap-on';

export class google {
  constructor(ctx) {
    passport.use(google_tap_on, new CustomStrategy(
      async function (this: any, req, callback) {
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

        const res = await ctx.google.auth(req);
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

    passport.serializeUser(function (user, done: any) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done: any) {
      done(null, user);
    });

  }

  async auth(req, res) {
    const csrf_token_cookie = req.body.credential;

    const client_id = '104553962015-q818tj1upgha4bhfnepfn37s1lfmcvvc.apps.googleusercontent.com';
    const client = new OAuth2Client(client_id);

    const ticket = await client.verifyIdToken({
      idToken: csrf_token_cookie,
      audience: client_id,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload()!;

    if (!payload.email_verified) {
      return null;
    }

    return {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };
  }
};
