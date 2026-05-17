"use client";

import { ArrowLeft, ArrowRight, Loader2, Plus, Tags } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiRequest, ApiError } from "@/lib/api";
import type { Note } from "@/lib/types";
import { useAuthSession } from "@/lib/use-auth-session";

const emptyForm = {
  title: "",
  content: "",
  tags: "",
  bookmarkUrl: "",
};

export default function NewNotePage() {
  const router = useRouter();
  const { session, isCheckingSession } = useAuthSession();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const parseTags = () =>
    form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) {
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const savedNote = await apiRequest<Note>("/notes", {
        method: "POST",
        token: session.token,
        body: {
          title: form.title,
          content: form.content,
          tags: parseTags(),
          bookmarkUrl: form.bookmarkUrl,
        },
      });

      router.push(`/notes/${savedNote._id}`);
    } catch (createError) {
      setError(
        createError instanceof ApiError
          ? createError.message
          : "Unable to create note.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isCheckingSession) {
    return (
      <section className="grid min-h-[calc(100vh-8rem)] place-items-center rounded-4xl border border-white/10 bg-white/5">
        <Loader2 className="animate-spin text-blue-300" size={34} />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <Link
        href="/notes"
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-bold text-blue-50 transition hover:bg-white/12"
      >
        <ArrowLeft size={16} />
        Back to library
      </Link>

      <header className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">
          New Note
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
          Capture a clean study note
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100/60">
          Create first, then Notely will take you to the focused note page where
          you can edit, generate AI summary, and share.
        </p>
      </header>

      {error ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <form
        onSubmit={handleCreate}
        className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-950/25 backdrop-blur"
      >
        <label className="block">
          <span className="text-sm font-semibold text-blue-100">Title</span>
          <input
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({ ...current, title: event.target.value }))
            }
            placeholder="Example: Physics chapter 4 revision"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-blue-100/40"
            required
          />
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-blue-100">Content</span>
          <textarea
            value={form.content}
            onChange={(event) =>
              setForm((current) => ({ ...current, content: event.target.value }))
            }
            placeholder="Write or paste your note content..."
            rows={10}
            className="mt-2 max-h-80 min-h-56 w-full resize-none overflow-y-auto rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-blue-100/40"
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
              placeholder="exam, math, important"
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
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
          Create and open note
          <ArrowRight size={16} />
        </button>
      </form>
    </section>
  );
}
