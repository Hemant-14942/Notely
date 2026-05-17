import { generateNoteInsights, type NoteInsights } from "./ai.service.js";
import { v4 as uuidv4 } from "uuid";
import { Note, type NoteDocument } from "../models/note.model.js";
import { AppError } from "../utils/app-error.js";
import type {
  CreateNoteInput,
  GetNotesQuery,
  UpdateNoteInput
} from "../validators/note.validator.js";

const escapeRegex = (value: string): string => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const normalizeTags = (tags?: string[]): string[] | undefined => {
  return tags?.map((tag) => tag.trim()).filter(Boolean);
};

type SharedNote = {
  title: string;
  content: string;
  tags: string[];
  bookmarkUrl?: string;
  updatedAt: Date;
};

export const createNote = async (userId: string, data: CreateNoteInput): Promise<NoteDocument> => {
  return Note.create({
    ...data,
    title: data.title.trim(),
    bookmarkUrl: data.bookmarkUrl?.trim() || undefined,
    tags: normalizeTags(data.tags) ?? [],
    userId
  });
};

export const getNotes = async (
  userId: string,
  queryFilters: GetNotesQuery
): Promise<NoteDocument[]> => {
  const filter: Record<string, unknown> = {
    userId,
    isArchived: false
  };

  if (queryFilters.search) {
    const regex = new RegExp(escapeRegex(queryFilters.search.trim()), "i");
    filter.$or = [{ title: regex }, { content: regex }];
  }

  if (queryFilters.tag) {
    filter.tags = queryFilters.tag.trim();
  }

  return Note.find(filter).sort({ updatedAt: -1 });
};

export const getNote = async (userId: string, noteId: string): Promise<NoteDocument> => {
  const note = await Note.findOne({ _id: noteId, userId, isArchived: false });

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  return note;
};

export const getSharedNotes = async (userId: string): Promise<NoteDocument[]> => {
  return Note.find({ userId, isArchived: false, isPublic: true }).sort({ updatedAt: -1 });
};

export const updateNote = async (
  userId: string,
  noteId: string,
  data: UpdateNoteInput
): Promise<NoteDocument> => {
  const update: Partial<UpdateNoteInput> & { lastEditedAt: Date } = {
    ...data,
    lastEditedAt: new Date()
  };

  if (data.title) {
    update.title = data.title.trim();
  }

  if (data.tags) {
    update.tags = normalizeTags(data.tags);
  }

  if (data.bookmarkUrl !== undefined) {
    update.bookmarkUrl = data.bookmarkUrl.trim() || undefined;
  }

  const note = await Note.findOneAndUpdate({ _id: noteId, userId }, update, {
    new: true,
    runValidators: true
  });

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  return note;
};

export const archiveNote = async (userId: string, noteId: string): Promise<NoteDocument> => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId },
    { isArchived: true },
    {
      new: true,
      runValidators: true
    }
  );

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  return note;
};

export const generateSummaryForNote = async (
  userId: string,
  noteId: string
): Promise<NoteInsights> => {
  const note = await Note.findOne({ _id: noteId, userId });

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  if (!note.content.trim()) {
    throw new AppError("Note content is empty", 400);
  }

  const insights = await generateNoteInsights(note.content);

  note.aiInsights = {
    ...insights,
    generatedAt: new Date()
  };
  await note.save();

  return insights;
};

export const shareNote = async (userId: string, noteId: string): Promise<string> => {
  const note = await Note.findOne({ _id: noteId, userId });

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  if (!note.shareId) {
    note.shareId = uuidv4();
  }

  note.isPublic = true;
  await note.save();

  return note.shareId;
};

export const getSharedNote = async (shareId: string): Promise<SharedNote> => {
  const note = await Note.findOne({ shareId, isPublic: true }).select(
    "title content tags bookmarkUrl updatedAt -_id"
  );

  if (!note) {
    throw new AppError("Shared note not found", 404);
  }

  return {
    title: note.title,
    content: note.content,
    tags: note.tags,
    bookmarkUrl: note.bookmarkUrl,
    updatedAt: note.updatedAt
  };
};
