import { Router } from "express";
import { getUserInsights } from "../controllers/insight.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();

router.use(authenticate);

router.get("/", asyncHandler(getUserInsights));

export default router;
