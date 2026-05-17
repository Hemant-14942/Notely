import { BrainCircuit, Calendar, Tags } from "lucide-react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

type SharedNote = {
  title: string;
  content: string;
  tags: string[];
  bookmarkUrl?: string;
  updatedAt: string;
};

type SharedNotePageProps = {
  params: Promise<{
    shareId: string;
  }>;
};

export default async function SharedNotePage({ params }: SharedNotePageProps) {
  const { shareId } = await params;
  let note: SharedNote | null = null;
  let error = "";

  try {
    note = await apiRequest<SharedNote>(`/shared/${shareId}`, {
      cache: "no-store",
    });
  } catch {
    error = "This shared note is not available or the link has expired.";
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08122f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,144,255,0.34),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(104,92,255,0.24),transparent_30%),linear-gradient(180deg,#07112d_0%,#0a1433_54%,#050913_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[34px_34px] opacity-35" />

      <div className="relative mx-auto max-w-4xl">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-blue-600">
              <BrainCircuit size={24} />
            </span>
            <span className="text-2xl font-black tracking-tight">Notely</span>
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-white px-5 py-2 text-sm font-bold text-[#08122f] transition hover:bg-blue-50"
          >
            Create account
          </Link>
        </header>

        <section className="mt-12 rounded-4xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-blue-950/40 backdrop-blur sm:p-10">
          {note ? (
            <>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">
                Shared note
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                {note.title}
              </h1>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-blue-100/65">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
                  <Calendar size={16} />
                  Updated {new Date(note.updatedAt).toLocaleDateString()}
                </span>
                {note.tags.length ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2">
                    <Tags size={16} />
                    {note.tags.join(", ")}
                  </span>
                ) : null}
              </div>

          {note.bookmarkUrl ? (
            <a
              href={note.bookmarkUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
            >
              Open attached resource
            </a>
          ) : null}

              <article className="mt-8 whitespace-pre-wrap rounded-3xl border border-white/10 bg-[#07112d]/80 p-6 text-base leading-8 text-blue-50/80">
                {note.content || "This note has no content yet."}
              </article>
            </>
          ) : (
            <div className="py-16 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">
                Shared note
              </p>
              <h1 className="mt-4 text-4xl font-black">Note not found</h1>
              <p className="mx-auto mt-4 max-w-xl text-blue-100/65">{error}</p>
              <Link
                href="/"
                className="mt-8 inline-flex rounded-full bg-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
              >
                Back to home
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
