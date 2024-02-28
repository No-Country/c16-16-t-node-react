import { Router } from "express";
import * as controller from "./controller.js";
import { auth, owner } from "../auth.js";
import { upload } from "../../uploadsFiles/uploads.js";

// eslint-disable-next-line new-cap
export const router = Router();
/**
 * /api/v1/pets POST - Create a new pet
 * /api/v1/pets GET - Get all pets
 *
 *
 */

router
  .route("/")
  .get(auth, controller.all)
  .post(auth, upload.array("imagePet"), controller.add);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(auth, owner, upload.array("imagePet"), controller.update)
  .patch(auth, owner, controller.update)
  .delete(auth, owner, controller.remove);
