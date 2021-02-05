import { Context, helpers } from "../deps.ts";

import { AUTH_STATUS } from "../util/interfaces.ts";

export function bodyParser() {
  return async (ctx: Context, next: () => Promise<void>) => {
    if (ctx.request.hasBody) {
      const body = ctx.request.body({ type: "json" });
      ctx.state.body = await body.value;
      await next();
      delete ctx.state.body;
    } else {
      await next();
    }
  };
}

export function paramsParser() {
  return async (ctx: Context, next: () => Promise<void>) => {
    ctx.state.params = helpers.getQuery(ctx, { mergeParams: true });
    await next();
    delete ctx.state.params;
  };
}

export async function authenticationParser(
  ctx: Context,
  next: () => Promise<void>,
) {
  const [type, authStr] =
    ctx.request.headers.get("Authorization")?.split(" ") ?? [];
  if (type && authStr) {
    ctx.state.auth = { type, authStr, status: AUTH_STATUS.UNAUTHENTICATED };
  }
  await next();
  delete ctx.state.auth;
}
