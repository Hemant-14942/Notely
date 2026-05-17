import { Router } from "express";
import {
  archiveNote,
  createNote,
  generateSummary,
  getNote,
  getNotes,
  getSharedNotes,
  shareNote,
  updateNote
} from "../controllers/note.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  createNoteSchema,
  getNotesSchema,
  noteIdParamSchema,
  updateNoteSchema
} from "../validators/note.validator.js";

const router = Router();

router.use(authenticate);

router.post("/", validate(createNoteSchema), asyncHandler(createNote));
router.get("/", validate(getNotesSchema), asyncHandler(getNotes));
router.get("/shared", asyncHandler(getSharedNotes));
router.get("/:id", validate(noteIdParamSchema), asyncHandler(getNote));
router.post("/:id/generate-summary", validate(noteIdParamSchema), asyncHandler(generateSummary));
router.post("/:id/share", validate(noteIdParamSchema), asyncHandler(shareNote));
router.patch("/:id", validate(updateNoteSchema), asyncHandler(updateNote));
router.delete("/:id", validate(noteIdParamSchema), asyncHandler(archiveNote));

export default router;
