import { Router } from "../deps.ts";
import sessionController from "../controllers/sessionController.ts";

import {
  authenticationParser,
  basicAuthenticator,
  bearerAuthenticator,
  dataOrMessage,
} from "../middlewares/index.ts";

const router = new Router();

router.use(dataOrMessage, authenticationParser);

router.post("/sessions", basicAuthenticator, sessionController.createSession);
router.get("/sessions", bearerAuthenticator, sessionController.verifySessoin);

export default router;
