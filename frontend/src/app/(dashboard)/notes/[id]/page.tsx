"use client";

import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Copy,
  ExternalLink,
  Loader2,
  Share2,
  Sparkles,
  Tags,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { apiRequest, ApiError } from "@/lib/api";
import type { Note, NoteInsights } from "@/lib/types";
import { useAuthSession } from "@/lib/use-auth-session";

const emptyForm = {
  title: "",
  content: "",
  tags: "",
  bookmarkUrl: "",
};

export default function NoteDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { session, isCheckingSession } = useAuthSession();
  const [note, setNote] = useState<Note | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [aiInsights, setAiInsights] = useState<NoteInsights | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!session || !params.id) {
      return;
    }

    const loadNote = async () => {
      setIsLoading(true);
      setError("");

      try {
        const noteData = await apiRequest<Note>(`/notes/${params.id}`, {
          token: session.token,
        });
        setNote(noteData);
        setForm({
          title: noteData.title,
          content: noteData.content,
          tags: noteData.tags.join(", "),
          bookmarkUrl: noteData.bookmarkUrl ?? "",
        });
        setAiInsights(noteData.aiInsights ?? null);
        setShareUrl(
          noteData.shareId ? `${window.location.origin}/shared/${noteData.shareId}` : "",
        );
      } catch (noteError) {
        setError(
          noteError instanceof ApiError ? noteError.message : "Unable to load note.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadNote();
  }, [params.id, session]);

  const parsedTags = useMemo(
    () =>
      form.tags
      .split(",")
      .map((tag) => tag.trim())
        .filter(Boolean),
    [form.tags],
  );

  const hasUnsavedChanges = useMemo(() => {
    if (!note) {
      return false;
    }

    return (
      form.title !== note.title ||
      form.content !== note.content ||
      form.bookmarkUrl !== (note.bookmarkUrl ?? "") ||
      parsedTags.join(",") !== note.tags.join(",")
    );
  }, [form.bookmarkUrl, form.content, form.title, note, parsedTags]);

  const saveNote = async () => {
    if (!session || !note || !hasUnsavedChanges) {
      return note;
    }

    setIsSaving(true);
    setError("");

    try {
      const savedNote = await apiRequest<Note>(`/notes/${note._id}`, {
        method: "PATCH",
        token: session.token,
        body: {
          title: form.title,
          content: form.content,
          tags: parsedTags,
          bookmarkUrl: form.bookmarkUrl,
        },
      });

      setNote(savedNote);
      setAiInsights(savedNote.aiInsights ?? aiInsights);
      setLastSavedAt(new Date());
      return savedNote;
    } catch (saveError) {
      setError(
        saveError instanceof ApiError ? saveError.message : "Unable to save note.",
      );
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!session || !note || !hasUnsavedChanges || !form.title.trim()) {
      return;
    }

    const autoSaveTimer = window.setTimeout(() => {
      void saveNote();
    }, 1200);

    return () => window.clearTimeout(autoSaveTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, hasUnsavedChanges, note?._id, session?.token]);

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await saveNote();
  };

  const handleGenerateSummary = async () => {
    if (!session || !note) {
      return;
    }

    const latestNote = hasUnsavedChanges ? await saveNote() : note;

    if (!latestNote) {
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const generatedInsights = await apiRequest<NoteInsights>(
        `/notes/${latestNote._id}/generate-summary`,
        {
          method: "POST",
          token: session.token,
        },
      );
      setAiInsights(generatedInsights);
    } catch (summaryError) {
      setError(
        summaryError instanceof ApiError
          ? summaryError.message
          : "Unable to generate AI summary.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!session || !note) {
      return;
    }

    try {
      const response = await apiRequest<{ shareId: string }>(
        `/notes/${note._id}/share`,
        {
          method: "POST",
          token: session.token,
        },
      );
      const publicUrl = `${window.location.origin}/shared/${response.shareId}`;
      setShareUrl(publicUrl);
      await navigator.clipboard?.writeText(publicUrl);
    } catch (shareError) {
      setError(
        shareError instanceof ApiError ? shareError.message : "Unable to share note.",
      );
    }
  };

  const handleArchive = async () => {
    if (!session || !note) {
      return;
    }

    try {
      await apiRequest<Note>(`/notes/${note._id}`, {
        method: "DELETE",
        token: session.token,
      });
      router.push("/notes");
    } catch (archiveError) {
      setError(
        archiveError instanceof ApiError
          ? archiveError.message
          : "Unable to archive note.",
      );
    }
  };

  if (isCheckingSession || isLoading) {
    return (
      <section className="grid min-h-[calc(100vh-8rem)] place-items-center rounded-4xl border border-white/10 bg-white/5">
        <Loader2 className="animate-spin text-blue-300" size={34} />
      </section>
    );
  }

  return (
    <section className="space-y-5">
      {error || !note ? (
        <div className="rounded-4xl border border-white/10 bg-white/5 p-10 text-center">
          <h1 className="text-3xl font-black">Note not found</h1>
          <p className="mt-3 text-blue-100/60">{error}</p>
        </div>
      ) : (
        <>
          <header className="rounded-4xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Link
                  href="/notes"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white"
                >
                  <ArrowLeft size={16} />
                  Back to library
                </Link>
                <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                  {note.title}
                </h1>
                <p className="mt-3 text-sm text-blue-100/60">
                  Edit this note, generate AI summary, and share it from one focused
                  workspace.
                </p>
                <p className="mt-2 text-xs font-semibold text-blue-100/45">
                  {isSaving
                    ? "Auto-saving changes..."
                    : lastSavedAt
                      ? `Saved ${lastSavedAt.toLocaleTimeString()}`
                      : "Auto-save is ready"}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleArchive}
                  className="inline-flex items-center gap-2 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100 transition hover:bg-red-500/20"
                >
                  <Archive size={16} />
                  Archive
                </button>
              </div>
            </div>
          </header>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1fr)_430px]">
            <form
              onSubmit={handleSave}
              className="rounded-4xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-blue-950/25 backdrop-blur"
            >
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
                Editor
              </p>

              <label className="mt-6 block">
                <span className="text-sm font-semibold text-blue-100">Title</span>
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, title: event.target.value }))
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-blue-100/40"
                  required
                />
              </label>

              <label className="mt-5 block">
                <span className="text-sm font-semibold text-blue-100">Content</span>
                <textarea
                  value={form.content}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      content: event.target.value,
                    }))
                  }
                  rows={12}
                  className="mt-2 max-h-112 min-h-72 w-full resize-none overflow-y-auto rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-blue-100/40"
                />
              </label>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="flex items-center gap-2 text-sm font-semibold text-blue-100">
                    <Tags size={16} />
                    Tags
                  </span>
                  <input
                    value={form.tags}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, tags: event.target.value }))
                    }
                    placeholder="math, exam, important"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-blue-100/40"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-blue-100">
                    Bookmark or resource URL
                  </span>
                  <input
                    value={form.bookmarkUrl}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        bookmarkUrl: event.target.value,
                      }))
                    }
                    placeholder="https://example.com/resource"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-blue-100/40"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : null}
                {hasUnsavedChanges ? "Save now" : "Saved"}
                <ArrowRight size={16} />
              </button>
            </form>

            <aside className="space-y-5 xl:sticky xl:top-5 xl:h-[calc(100vh-2.5rem)] xl:overflow-y-auto">
              <div className="rounded-4xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-blue-950/25 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-500 text-white">
                    <Sparkles size={21} />
                  </span>
                  <div>
                    <h2 className="font-black">AI summary</h2>
                    <p className="text-sm text-blue-100/55">
                      Generate study insights after saving content.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateSummary}
                  disabled={isGenerating || !note.content.trim()}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGenerating ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Sparkles size={17} />
                  )}
                  Generate AI summary
                </button>

                {aiInsights ? (
                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl bg-white/7 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                        Suggested title
                      </p>
                      <p className="mt-2 font-semibold">
                        {aiInsights.suggested_title}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/7 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                        Summary
                      </p>
                      <p className="mt-2 text-sm leading-7 text-blue-100/70">
                        {aiInsights.summary}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/7 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                        Action items
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-blue-100/70">
                        {aiInsights.action_items.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="mt-5 rounded-2xl border border-dashed border-white/15 p-4 text-sm leading-6 text-blue-100/55">
                    No AI result yet. Save your content, then generate a summary.
                  </p>
                )}
              </div>

              <div className="rounded-4xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-blue-950/25 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-500 text-white">
                    <Share2 size={20} />
                  </span>
                  <div>
                    <h2 className="font-black">Share note</h2>
                    <p className="text-sm text-blue-100/55">
                      Create and copy a public note link.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-5 py-3 text-sm font-bold text-blue-50 transition hover:bg-white/12"
                >
                  <Copy size={16} />
                  Share and copy link
                </button>

                {shareUrl ? (
                  <p className="mt-4 break-all rounded-2xl bg-white/7 p-4 text-sm leading-6 text-blue-100/70">
                    {shareUrl}
                  </p>
                ) : null}
              </div>

              {form.bookmarkUrl ? (
                <a
                  href={form.bookmarkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
                >
                  <ExternalLink size={16} />
                  Open attached resource
                </a>
              ) : null}
            </aside>
          </div>
        </>
      )}
    </section>
  );
}
