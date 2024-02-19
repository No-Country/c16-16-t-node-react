import { Router } from "express";
import * as controller from "./controller.js";
import { auth, owner } from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router();
/**

 *
 *
 */

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(auth, owner, controller.update)
  .patch(auth, owner, controller.update)
  .delete(auth, owner, controller.remove);
