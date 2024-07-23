import expressWs from 'express-ws';

declare global {
  interface Express {
    ws: expressWs.Application;
  }
}

export function serverWs(ctx) {
  expressWs(ctx.app);
  ctx.ws = ctx.app.ws;
}
