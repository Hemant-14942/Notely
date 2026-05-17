import { Router } from "express";
import { getSharedNote } from "../controllers/shared.controller.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();

router.get("/:shareId", asyncHandler(getSharedNote));

export default router;
