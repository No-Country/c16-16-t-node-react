import {Router} from "express";
import * as controller from "./controller.js";
import {auth} from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router();
/**
 * /api/v1/posting POST - Create a new posting
 * /api/v1/posting GET - Get all postings
 * 
 * 
 */

router.route("/").get(auth, controller.all).post(auth, controller.add);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(auth, controller.update)
  .patch(auth, controller.update)
  .delete(auth, controller.remove);
