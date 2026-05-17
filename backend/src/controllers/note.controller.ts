import type { Request, Response } from "express";
import {
  archiveNote as archiveNoteService,
  createNote as createNoteService,
  generateSummaryForNote as generateSummaryForNoteService,
  getNote as getNoteService,
  getNotes as getNotesService,
  getSharedNotes as getSharedNotesService,
  shareNote as shareNoteService,
  updateNote as updateNoteService
} from "../services/note.service.js";
import { sendSuccess } from "../utils/api-response.js";
import { AppError } from "../utils/app-error.js";
import type {
  CreateNoteInput,
  GetNotesQuery,
  UpdateNoteInput
} from "../validators/note.validator.js";

const getAuthenticatedUserId = (req: Request): string => {
  if (!req.userId) {
    throw new AppError("Unauthorized", 401);
  }

  return req.userId;
};

const getNoteId = (req: Request): string => {
  const noteId = req.params.id;

  if (!noteId || Array.isArray(noteId)) {
    throw new AppError("Invalid note id", 400);
  }

  return noteId;
};

export const createNote = async (req: Request, res: Response) => {
  const note = await createNoteService(getAuthenticatedUserId(req), req.body as CreateNoteInput);
  return sendSuccess(res, 201, "Note created successfully", note);
};

export const getNotes = async (req: Request, res: Response) => {
  const notes = await getNotesService(getAuthenticatedUserId(req), req.query as GetNotesQuery);
  return sendSuccess(res, 200, "Notes fetched successfully", notes);
};

export const getNote = async (req: Request, res: Response) => {
  const note = await getNoteService(getAuthenticatedUserId(req), getNoteId(req));
  return sendSuccess(res, 200, "Note fetched successfully", note);
};

export const getSharedNotes = async (req: Request, res: Response) => {
  const notes = await getSharedNotesService(getAuthenticatedUserId(req));
  return sendSuccess(res, 200, "Shared notes fetched successfully", notes);
};

export const updateNote = async (req: Request, res: Response) => {
  const note = await updateNoteService(
    getAuthenticatedUserId(req),
    getNoteId(req),
    req.body as UpdateNoteInput
  );
  return sendSuccess(res, 200, "Note updated successfully", note);
};

export const archiveNote = async (req: Request, res: Response) => {
  const note = await archiveNoteService(getAuthenticatedUserId(req), getNoteId(req));
  return sendSuccess(res, 200, "Note archived successfully", note);
};

export const generateSummary = async (req: Request, res: Response) => {
  const insights = await generateSummaryForNoteService(getAuthenticatedUserId(req), getNoteId(req));
  return sendSuccess(res, 200, "Note insights generated successfully", insights);
};

export const shareNote = async (req: Request, res: Response) => {
  const shareId = await shareNoteService(getAuthenticatedUserId(req), getNoteId(req));
  return sendSuccess(res, 200, "Note shared successfully", { shareId });
};
