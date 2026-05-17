import { Schema, model, type Document, type Model, type Types } from "mongoose";

export type NoteDocument = Document & {
  title: string;
  content: string;
  tags: string[];
  bookmarkUrl?: string;
  aiInsights?: {
    summary: string;
    action_items: string[];
    suggested_title: string;
    generatedAt: Date;
  };
  isArchived: boolean;
  isPublic: boolean;
  shareId?: string;
  userId: Types.ObjectId;
  lastEditedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const noteSchema = new Schema<NoteDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      default: ""
    },
    tags: {
      type: [String],
      default: []
    },
    bookmarkUrl: {
      type: String,
      trim: true
    },
    aiInsights: {
      summary: {
        type: String
      },
      action_items: {
        type: [String],
        default: undefined
      },
      suggested_title: {
        type: String
      },
      generatedAt: {
        type: Date
      }
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    shareId: {
      type: String,
      sparse: true,
      unique: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    lastEditedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export const Note: Model<NoteDocument> = model<NoteDocument>("Note", noteSchema);
