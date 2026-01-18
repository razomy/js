import {OAuth2Client} from 'google-auth-library';
import {ensureLoggedIn as ensureLogIn} from 'connect-ensure-login';
import {Strategy as CustomStrategy} from 'passport-custom';
import passport from 'passport';

export const isAuthenticated = ensureLogIn();
export const googleTapOn = 'google-tap-on';

export class Google {
  constructor(ctx) {
    passport.use(googleTapOn, new CustomStrategy(
      async function (this: any, req, callback) {
        const csrfTokenCookie = req.cookies.g_csrf_token;
        if (!csrfTokenCookie) {
          this.fail(400, 'No CSRF token in Cookie.');
          return;
        }

        const csrfTokenBody = req.body.g_csrf_token;
        if (!csrfTokenBody) {
          this.fail(400, 'No CSRF token in post body.');
          return;
        }

        if (csrfTokenCookie !== csrfTokenBody) {
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
    const csrfTokenCookie = req.body.credential;

    const clientId = '104553962015-q818tj1upgha4bhfnepfn37s1lfmcvvc.apps.googleusercontent.com';
    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
      idToken: csrfTokenCookie,
      audience: clientId,  // Specify the CLIENT_ID of the app that accesses the backend
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
}
