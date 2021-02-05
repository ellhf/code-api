import { Base64, Context } from "../deps.ts";
import { AUTH_STATUS } from "../util/interfaces.ts";
import { verifyToken } from "../util/jwt.ts";
import { User } from "../models/User.ts";

export async function basicAuthenticator(
  ctx: Context,
  next: () => Promise<void>,
) {
  const { type, authStr, status } = ctx.state?.auth ?? {};
  if (
    type === "Basic" && authStr && status === AUTH_STATUS.UNAUTHENTICATED &&
    !ctx.state.user
  ) {
    const [username, password] = Base64.fromBase64String(authStr).toString()
      .split(":");
    const [user] = await User.where({
      username,
      password,
    }).all();
    if (user) {
      ctx.state.user = user;
      ctx.state.auth.status = AUTH_STATUS.AUTHENTICATED;
    } else {
      ctx.state.auth.status = AUTH_STATUS.FAILED;
    }
  }
  await next();
  delete ctx.state.user;
}

export async function bearerAuthenticator(
  ctx: Context,
  next: () => Promise<void>,
) {
  const { type, authStr, status } = ctx.state?.auth ?? {};
  if (
    type === "Bearer" && authStr && status === AUTH_STATUS.UNAUTHENTICATED &&
    !ctx.state.user
  ) {
    try {
      const user = await verifyToken(authStr);
      ctx.state.user = user;
      ctx.state.auth.status = AUTH_STATUS.AUTHENTICATED;
    } catch (err) {
      ctx.state.auth.status = AUTH_STATUS.FAILED;
      ctx.state.message = err;
    }
  }
  await next();
  delete ctx.state.user;
}
