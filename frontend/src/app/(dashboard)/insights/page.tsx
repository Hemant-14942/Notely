"use client";

import {
  BarChart3,
  BrainCircuit,
  FileText,
  Hash,
  Loader2,
  PencilLine,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { notify } from "@/lib/toast";
import type { Note, UserInsights } from "@/lib/types";
import { useAuthSession } from "@/lib/use-auth-session";

export default function InsightsPage() {
  const { session, isCheckingSession } = useAuthSession();
  const [insights, setInsights] = useState<UserInsights | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      return;
    }

    const loadInsights = async () => {
      setIsLoading(true);

      try {
        const [insightData, noteData] = await Promise.all([
          apiRequest<UserInsights>("/insights", { token: session.token }),
          apiRequest<Note[]>("/notes", { token: session.token }),
        ]);
        setInsights(insightData);
        setNotes(noteData);
      } catch (insightError) {
        notify.apiError(insightError, "Unable to load your insights dashboard.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadInsights();
  }, [session]);

  if (isCheckingSession || isLoading) {
    return (
      <section className="grid min-h-[calc(100vh-8rem)] place-items-center rounded-4xl border border-white/10 bg-white/5">
        <Loader2 className="animate-spin text-blue-300" size={34} />
      </section>
    );
  }

  const summaryCards = [
    {
      label: "Total notes",
      value: insights?.totalNotes ?? 0,
      icon: BarChart3,
      helper: "Saved in your library",
    },
    {
      label: "Recently edited",
      value: insights?.recentlyEdited ?? 0,
      icon: PencilLine,
      helper: "Manual edits this week",
    },
    {
      label: "AI summaries saved",
      value: notes.filter((note) => note.aiInsights).length,
      icon: Sparkles,
      helper: "Notes with generated insights",
    },
    {
      label: "Shared notes",
      value: notes.filter((note) => note.isPublic).length,
      icon: Share2,
      helper: "Public study links",
    },
  ];

  const aiSummaryCount = notes.filter((note) => note.aiInsights).length;
  const sharedCount = notes.filter((note) => note.isPublic).length;
  const bookmarkedCount = notes.filter((note) => note.bookmarkUrl).length;
  const totalNotes = Math.max(notes.length, 1);
  const aiCoverage = Math.round((aiSummaryCount / totalNotes) * 100);
  const sharedCoverage = Math.round((sharedCount / totalNotes) * 100);
  const bookmarkCoverage = Math.round((bookmarkedCount / totalNotes) * 100);
  const maxTagCount = Math.max(...(insights?.topTags.map((tag) => tag.count) ?? [1]), 1);
  const recentNotes = [...notes]
    .sort(
      (firstNote, secondNote) =>
        new Date(secondNote.updatedAt).getTime() -
        new Date(firstNote.updatedAt).getTime(),
    )
    .slice(0, 5);

  return (
    <section className="space-y-6">
      <header className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative grid gap-6 xl:grid-cols-[1fr_360px] xl:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">
              Insights
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
              Your learning activity
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100/60">
              A professional overview of your notes, AI usage, shared resources,
              tags, and recent workspace activity.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-300/20 bg-blue-500/10 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-500 text-white">
                <TrendingUp size={22} />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Workspace health</p>
                <p className="text-xs text-blue-100/55">Based on AI and sharing</p>
              </div>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-300 to-blue-500"
                style={{ width: `${Math.min(aiCoverage + sharedCoverage / 2, 100)}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-blue-100/65">
              {Math.min(aiCoverage + Math.round(sharedCoverage / 2), 100)}% optimized
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-950/20 backdrop-blur"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/25">
                <Icon size={22} />
              </span>
              <p className="mt-6 text-sm text-blue-100/55">{card.label}</p>
              <p className="mt-2 text-4xl font-black text-white">{card.value}</p>
              <p className="mt-2 text-xs text-blue-100/45">{card.helper}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
          <div className="flex items-center gap-3">
            <Hash className="text-blue-300" />
            <div>
              <h2 className="text-2xl font-black">Tag distribution</h2>
              <p className="mt-1 text-sm text-blue-100/55">
                Most used topics across your notes.
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            {insights?.topTags.length ? (
              insights.topTags.map((tag) => (
                <div
                  key={tag.tag}
                  className="rounded-2xl border border-white/10 bg-white/7 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold text-white">#{tag.tag}</span>
                    <span className="text-sm text-blue-100/60">{tag.count} notes</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-blue-300 via-blue-500 to-indigo-500"
                      style={{ width: `${Math.max((tag.count / maxTagCount) * 100, 8)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-blue-100/60">
                Add tags to your notes to see your most used study topics.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
          <div className="flex items-center gap-3">
            <BrainCircuit className="text-blue-300" />
            <div>
              <h2 className="text-2xl font-black">Feature coverage</h2>
              <p className="mt-1 text-sm text-blue-100/55">
                How much of Notely you are using.
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {[
              ["AI summaries", aiCoverage, `${aiSummaryCount}/${notes.length || 0} notes`],
              ["Shared notes", sharedCoverage, `${sharedCount}/${notes.length || 0} notes`],
              ["Bookmarks", bookmarkCoverage, `${bookmarkedCount}/${notes.length || 0} notes`],
            ].map(([label, value, helper]) => (
              <div key={label} className="rounded-2xl bg-white/7 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-white">{label}</p>
                  <p className="text-sm font-bold text-blue-200">{value}%</p>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-blue-100/50">{helper}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-300" />
            <h2 className="text-2xl font-black">Note status</h2>
          </div>
          <div className="mt-6 grid gap-3">
            {[
              ["Plain notes", notes.length - aiSummaryCount, "Without AI summary"],
              ["AI-ready notes", aiSummaryCount, "Generated summaries"],
              ["Public notes", sharedCount, "Shared with others"],
            ].map(([label, value, helper]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl bg-white/7 p-4"
              >
                <div>
                  <p className="font-bold text-white">{label}</p>
                  <p className="mt-1 text-xs text-blue-100/50">{helper}</p>
                </div>
                <p className="text-3xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
          <h2 className="text-2xl font-black">Recent activity</h2>
          <div className="mt-6 space-y-3">
            {recentNotes.map((note) => (
              <div
                key={note._id}
                className="grid gap-4 rounded-2xl bg-white/7 p-4 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="font-bold text-white">{note.title}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-blue-100/60">
                    {note.aiInsights?.summary ?? note.content ?? "No content yet."}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {note.aiInsights ? (
                      <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-200">
                        AI summary
                      </span>
                    ) : null}
                    {note.isPublic ? (
                      <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-blue-100/65">
                        Shared
                      </span>
                    ) : null}
                  </div>
                </div>
                <p className="text-sm text-blue-100/50">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
            {!notes.length ? (
              <p className="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-blue-100/60">
                Create notes to start seeing recent activity.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </section>
  );
}
