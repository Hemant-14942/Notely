"use client";

import { ArrowRight, BrainCircuit, Loader2, Sparkles, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiRequest, ApiError } from "@/lib/api";
import { saveSession, type AuthSession } from "@/lib/auth";

type AuthResponse = AuthSession;

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const session = await apiRequest<AuthResponse>("/auth/register", {
        method: "POST",
        body: { name, email, password },
      });

      saveSession(session);
      router.push("/notes");
    } catch (signupError) {
      setError(
        signupError instanceof ApiError
          ? signupError.message
          : "Unable to create your account right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08122f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,144,255,0.34),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(104,92,255,0.24),transparent_30%),linear-gradient(180deg,#07112d_0%,#0a1433_54%,#050913_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[34px_34px] opacity-35" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
        <section className="order-2 rounded-4xl border border-white/10 bg-white/8 p-6 shadow-2xl shadow-blue-950/40 backdrop-blur sm:p-8 lg:order-1">
          <div className="mb-8 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
              <UserPlus size={24} />
            </span>
            <div>
              <h2 className="text-2xl font-black">Create account</h2>
              <p className="text-sm text-blue-100/60">Start your Notely workspace</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-blue-100">Name</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-blue-100/40"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-blue-100">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-blue-100/40"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-blue-100">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                minLength={8}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-blue-100/40"
                required
              />
            </label>

            {error ? (
              <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : null}
              Create workspace
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-blue-100/60">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-blue-300 hover:text-white">
              Login
            </Link>
          </p>
        </section>

        <section className="order-1 lg:order-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-blue-600">
              <BrainCircuit size={24} />
            </span>
            <span className="text-2xl font-black tracking-tight">Notely</span>
          </Link>

          <p className="mt-12 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200">
            <Sparkles size={16} />
            AI notes workspace
          </p>
          <h1 className="mt-5 max-w-2xl text-5xl font-black leading-tight tracking-tight sm:text-7xl">
            Build your second brain for study notes.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100/70">
            Create your account and start saving notes, generating summaries,
            organizing tags, and sharing helpful material.
          </p>
        </section>
      </div>
    </main>
  );
}
