import { Router } from "../deps.ts";

import userController from "../controllers/userController.ts";
import { dataOrMessage, paramsParser } from "../middlewares/index.ts";

const router = new Router();

router.use(dataOrMessage);

router.get("/users", userController.getAllUsers);
router.post("/users", userController.addUser);
router.get("/users/:id", paramsParser(), userController.getUserById);
router.put("/users/:id", paramsParser(), userController.updateUserById);
router.delete("/users/:id", paramsParser(), userController.deleteUserById);

export default router;
