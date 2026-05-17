import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid note id");

const tagsSchema = z.array(z.string().trim().min(1, "Tag cannot be empty"));

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    content: z.string().optional(),
    tags: tagsSchema.optional(),
    bookmarkUrl: z.string().trim().url("Bookmark must be a valid URL").optional().or(z.literal(""))
  })
});

export const getNotesSchema = z.object({
  query: z.object({
    search: z.string().trim().optional(),
    tag: z.string().trim().optional()
  })
});

export const updateNoteSchema = z.object({
  params: z.object({
    id: objectIdSchema
  }),
  body: z.object({
    title: z.string().trim().min(1, "Title cannot be empty").optional(),
    content: z.string().optional(),
    tags: tagsSchema.optional(),
    bookmarkUrl: z.string().trim().url("Bookmark must be a valid URL").optional().or(z.literal("")),
    isArchived: z.boolean().optional()
  })
});

export const noteIdParamSchema = z.object({
  params: z.object({
    id: objectIdSchema
  })
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>["body"];
export type GetNotesQuery = z.infer<typeof getNotesSchema>["query"];
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>["body"];
