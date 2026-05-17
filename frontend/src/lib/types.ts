export type NoteInsights = {
  summary: string;
  action_items: string[];
  suggested_title: string;
  generatedAt?: string;
};

export type Note = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  bookmarkUrl?: string;
  aiInsights?: NoteInsights;
  isPublic: boolean;
  shareId?: string;
  lastEditedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserInsights = {
  totalNotes: number;
  recentlyEdited: number;
  topTags: { tag: string; count: number }[];
};
