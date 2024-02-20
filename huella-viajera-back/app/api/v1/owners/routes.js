import { Router } from "express";
import * as controller from "./controller.js";
import { auth, owner } from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router();
/**

 *
 */

router.param("id", controller.id);

router
  .route("/profile/:id")
  .get(auth, controller.read)
  .put(auth, controller.update)
  .patch(auth, controller.update)
  .delete(auth, controller.remove);
