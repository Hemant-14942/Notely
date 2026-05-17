import { Router } from "express";
import authRoutes from "./auth.routes.js";
import insightRoutes from "./insight.routes.js";
import noteRoutes from "./note.routes.js";
import sharedRoutes from "./shared.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/notes", noteRoutes);
router.use("/shared", sharedRoutes);
router.use("/insights", insightRoutes);

export default router;
