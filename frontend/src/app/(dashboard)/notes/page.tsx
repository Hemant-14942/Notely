"use client";

import {
  BrainCircuit,
  CalendarDays,
  ExternalLink,
  FileText,
  Loader2,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiRequest, ApiError } from "@/lib/api";
import type { Note, UserInsights } from "@/lib/types";
import { useAuthSession } from "@/lib/use-auth-session";

export default function NotesPage() {
  const { session, isCheckingSession } = useAuthSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [insights, setInsights] = useState<UserInsights | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      return;
    }

    const loadNotes = async () => {
      setIsLoading(true);
      setError("");

      try {
        const [notesData, insightData] = await Promise.all([
          apiRequest<Note[]>("/notes", { token: session.token }),
          apiRequest<UserInsights>("/insights", { token: session.token }),
        ]);

        setNotes(notesData);
        setInsights(insightData);
      } catch (notesError) {
        setError(
          notesError instanceof ApiError
            ? notesError.message
            : "Unable to load notes.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadNotes();
  }, [session]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesSearch;
    });
  }, [notes, search]);

  if (isCheckingSession || isLoading) {
    return (
      <section className="grid min-h-[calc(100vh-8rem)] place-items-center rounded-4xl border border-white/10 bg-white/5">
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-blue-300" size={34} />
          <p className="mt-4 text-sm font-semibold text-blue-100/70">
            Loading your notes library...
          </p>
        </div>
      </section>
    );
  }

  const stats = [
    ["Total notes", insights?.totalNotes ?? 0],
    ["Recently edited", insights?.recentlyEdited ?? 0],
    ["AI summaries", notes.filter((note) => note.aiInsights).length],
    ["Shared notes", notes.filter((note) => note.isPublic).length],
  ];

  return (
    <section className="space-y-6">
      <header className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur">
        <div className="grid gap-6 xl:grid-cols-[1fr_auto] xl:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">
              Notes Library
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
              All your notes in one clean space
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100/60">
              Search, filter, open, and review your saved notes. Creation and AI
              work now happen on focused pages, so this library stays uncluttered.
            </p>
          </div>

          <Link
            href="/notes/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400"
          >
            <Plus size={18} />
            Create note
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/6 p-4">
              <p className="text-xs text-blue-100/55">{label}</p>
              <p className="mt-1 text-3xl font-black">{value}</p>
            </div>
          ))}
        </div>
      </header>

      <section className="rounded-4xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-blue-950/25 backdrop-blur">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
          <Search size={18} className="text-blue-300" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, content, or tag..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-blue-100/40"
          />
        </div>
      </section>

      {error ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      {filteredNotes.length ? (
        <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {filteredNotes.map((note) => (
            <Link
              key={note._id}
              href={`/notes/${note._id}`}
              className="group rounded-4xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-blue-950/20 backdrop-blur transition hover:-translate-y-1 hover:border-blue-300/30 hover:bg-blue-500/10"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500/15 text-blue-200 transition group-hover:bg-blue-500 group-hover:text-white">
                  <FileText size={20} />
                </span>
                <div className="flex gap-2">
                  {note.aiInsights ? (
                    <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-200">
                      AI
                    </span>
                  ) : null}
                  {note.isPublic ? (
                    <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-blue-100/70">
                      Shared
                    </span>
                  ) : null}
                </div>
              </div>

              <h2 className="mt-5 text-2xl font-black text-white">{note.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-blue-100/60">
                {note.aiInsights?.summary || note.content || "No content yet."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {note.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-blue-100/65"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-blue-100/55">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={14} />
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>
                <span className="inline-flex items-center gap-2 font-bold text-blue-200">
                  Open note
                  <ExternalLink size={14} />
                </span>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section className="rounded-4xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
          <BrainCircuit className="mx-auto text-blue-300" size={42} />
          <h2 className="mt-4 text-3xl font-black">No notes found</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100/60">
            Create your first note or adjust your search/filter to find the right
            study material.
          </p>
          <Link
            href="/notes/new"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
          >
            <Plus size={17} />
            Create note
          </Link>
        </section>
      )}
    </section>
  );
}
