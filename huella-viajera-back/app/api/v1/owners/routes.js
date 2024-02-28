import { Router } from "express";
import * as controller from "./controller.js";
import { auth, owner } from "../auth.js";
import { upload } from "../../uploadsFiles/uploads.js";

// eslint-disable-next-line new-cap
export const router = Router();
/**

 *
 */

router.param("id", controller.id);

router
  .route("/profile/:id")
  .get(controller.read)
  .put(auth, upload.array("images"), controller.update)
  .patch(auth, upload.array("images"), controller.update)
  .delete(auth, controller.remove);

router
  .route("/profilePhoto/:id")
  .put(auth, upload.array("imageProfile"), controller.updateProfilePhoto)
  .patch(auth, upload.array("imageProfile"), controller.updateProfilePhoto);
