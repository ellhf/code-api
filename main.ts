import { Application } from "./deps.ts";

import { bodyParser } from "./middlewares/index.ts";
import { APP_PORT, DB_INIT_DROP } from "./config.ts";
import { initDB } from "./util/db.ts";
import routes from "./routes/index.ts";

const app = new Application();

await initDB({
  drop: DB_INIT_DROP,
});

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(bodyParser());

app.use(...routes.get());

app.addEventListener("listen", () => {
  console.log(`Listening at http://localhost:${APP_PORT}`);
});
app.addEventListener("error", (err) => {
  console.error(err);
});

await app.listen({ port: APP_PORT });
