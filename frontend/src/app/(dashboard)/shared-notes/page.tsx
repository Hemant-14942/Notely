"use client";

import { Copy, ExternalLink, Loader2, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiRequest, ApiError } from "@/lib/api";
import type { Note } from "@/lib/types";
import { useAuthSession } from "@/lib/use-auth-session";

export default function SharedNotesPage() {
  const { session, isCheckingSession } = useAuthSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      return;
    }

    const loadSharedNotes = async () => {
      setIsLoading(true);
      setError("");

      try {
        const sharedNotes = await apiRequest<Note[]>("/notes/shared", {
          token: session.token,
        });
        setNotes(sharedNotes);
      } catch (sharedError) {
        setError(
          sharedError instanceof ApiError
            ? sharedError.message
            : "Unable to load shared notes.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadSharedNotes();
  }, [session]);

  const copyLink = async (note: Note) => {
    if (!note.shareId) {
      return;
    }

    const url = `${window.location.origin}/shared/${note.shareId}`;
    await navigator.clipboard?.writeText(url);
    setCopiedId(note._id);
  };

  if (isCheckingSession || isLoading) {
    return (
      <section className="grid min-h-[calc(100vh-8rem)] place-items-center rounded-4xl border border-white/10 bg-white/5">
        <Loader2 className="animate-spin text-blue-300" size={34} />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">
          Shared Notes
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Public study material
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100/60">
          Manage notes you have shared and copy public links for classmates.
        </p>
      </header>

      {error ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <article
            key={note._id}
            className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-950/20 backdrop-blur"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500 text-white">
                <Share2 size={22} />
              </span>
              <p className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-200">
                Public
              </p>
            </div>
            <h2 className="mt-5 text-2xl font-black text-white">{note.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-blue-100/65">
              {note.content || "No content yet."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-blue-100/65"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void copyLink(note)}
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
              >
                <Copy size={16} />
                {copiedId === note._id ? "Copied" : "Copy link"}
              </button>
              {note.shareId ? (
                <Link
                  href={`/shared/${note.shareId}`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-bold text-blue-50 transition hover:bg-white/12"
                >
                  <ExternalLink size={16} />
                  Open
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {!notes.length ? (
        <div className="rounded-4xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
          <Share2 className="mx-auto text-blue-300" size={38} />
          <h2 className="mt-4 text-2xl font-black">No shared notes yet</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-blue-100/60">
            Open a note, click share, and your public notes will appear here.
          </p>
          <Link
            href="/notes"
            className="mt-6 inline-flex rounded-2xl bg-blue-500 px-5 py-3 text-sm font-bold text-white"
          >
            Go to notes
          </Link>
        </div>
      ) : null}
    </section>
  );
}
