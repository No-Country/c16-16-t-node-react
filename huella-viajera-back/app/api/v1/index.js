import { Router } from "express";
import { router as users } from "./users/routes.js";
import { router as pets } from "./pets/routes.js";
import { router as carers } from "./carers/routes.js";
import { router as owners } from "./owners/routes.js";
import { router as ratings } from "./ratings/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.use("/users", users);
router.use("/pets", pets);
router.use("/carers", carers);
router.use("/owners", owners);
router.use("/ratings", ratings);
