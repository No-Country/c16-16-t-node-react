import { Router } from "express";
import * as controller from "./controller.js";
import { auth, me } from "../auth.js";
import { upload } from "../../uploadsFiles/uploads.js";

// eslint-disable-next-line new-cap
export const router = Router();
/**

 *
 */

router.param("id", controller.id);

router
  .route("/profile/:id")
  .get(auth, controller.read)
  .put(auth, me, controller.update)
  .patch(auth, me, controller.update)
  .delete(auth, controller.remove);

router
  .route("/profilePhoto/:id")
  .put(auth, me, upload.array("imageProfile"), controller.updateProfilePhoto)
  .patch(auth, me, upload.array("imageProfile"), controller.updateProfilePhoto);
