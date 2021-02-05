import { Context } from "../deps.ts";
import { createToken } from "../util/jwt.ts";
import { AUTH_STATUS } from "../util/interfaces.ts";

export default {
  async createSession(ctx: Context) {
    if (ctx.state?.auth?.status === AUTH_STATUS.AUTHENTICATED) {
      const { id, username, aliasname } = ctx.state.user;
      const iat = Math.floor(+new Date() / 1000);
      const exp = iat + 3600;
      const token = await createToken({
        id, username, aliasname, iat, exp
      });
      ctx.state.data = token;
    }
  },
  verifySessoin(ctx: Context) {
    if (ctx.state?.auth?.status === AUTH_STATUS.AUTHENTICATED) {
      ctx.state.data = ctx.state.user;
    }
  },
};
