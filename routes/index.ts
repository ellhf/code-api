import { Middleware } from "../deps.ts";
import user from "./user.ts";
import session from "./session.ts";
import { API_VERSION } from "../config.ts";

const routes = [ user, session ];
routes.forEach((route) => route.prefix(API_VERSION));

export default {
  get(): Middleware[] {
    return routes.reduce<Middleware[]>((result, route) => {
      result.push(route.allowedMethods());
      result.push(route.routes());
      return result;
    }, []);
  },
};
