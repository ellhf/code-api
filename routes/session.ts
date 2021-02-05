import {
  Router
} from "../deps.ts";

import sessionController from "../controllers/sessionController.ts";

import {
  dataOrMessage,
  authenticationParser,
  basicAuthenticator,
  bearerAuthenticator
} from "../middlewares/index.ts";

const router = new Router();

router.use(dataOrMessage, authenticationParser);

router.post("/sessions", basicAuthenticator, sessionController.createSession);
router.get("/sessions", bearerAuthenticator, sessionController.verifySessoin);

export default router;
