import { Router } from "express";
import * as controller from "./controller.js";
import { auth } from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router();
/**
 * /api/v1/posting/getAll GET - Get all postings
 * /api/v1/posting/new POST - Create a new posting
 * /api/v1/posting/:id GET - Get a posting
 * /api/v1/posting/:id PUT - Update a posting
 * /api/v1/posting/:id/status PUT - Update a request
 * /api/v1/posting/:id PATCH - Update a posting
 * /api/v1/posting/:id DELETE - Delete a posting
 */

router.route("/getAll").get(auth, controller.all);
router.route("/list").get(controller.list);
router.route("/new").post(auth, controller.add);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(auth, controller.update)
  .patch(auth, controller.update)
  .delete(auth, controller.remove);
