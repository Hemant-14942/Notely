import type { Request, Response } from "express";
import { getSharedNote as getSharedNoteService } from "../services/note.service.js";
import { sendSuccess } from "../utils/api-response.js";
import { AppError } from "../utils/app-error.js";

const getShareId = (req: Request): string => {
  const shareId = req.params.shareId;

  if (!shareId || Array.isArray(shareId)) {
    throw new AppError("Invalid share id", 400);
  }

  return shareId;
};

export const getSharedNote = async (req: Request, res: Response) => {
  const note = await getSharedNoteService(getShareId(req));
  return sendSuccess(res, 200, "Shared note fetched successfully", note);
};
