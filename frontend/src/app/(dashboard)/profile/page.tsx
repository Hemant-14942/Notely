"use client";

import { LogOut, Mail, ShieldCheck, User } from "lucide-react";
import { useAuthSession } from "@/lib/use-auth-session";

export default function ProfilePage() {
  const { session, isCheckingSession, logout } = useAuthSession();

  if (isCheckingSession || !session) {
    return (
      <section className="grid min-h-[calc(100vh-8rem)] place-items-center rounded-4xl border border-white/10 bg-white/5">
        <p className="text-blue-100/65">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">
          Profile
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Account settings
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100/60">
          Manage your current Notely session and account details.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
          <div className="grid h-20 w-20 place-items-center rounded-3xl bg-blue-500 text-2xl font-black text-white shadow-lg shadow-blue-500/25">
            {session.user.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <h2 className="mt-5 text-3xl font-black">{session.user.name}</h2>
          <p className="mt-2 text-blue-100/60">{session.user.email}</p>
          <button
            type="button"
            onClick={logout}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
          >
            <LogOut size={17} />
            Logout
          </button>
        </section>

        <section className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
          <h2 className="text-2xl font-black">Account details</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4 rounded-2xl bg-white/7 p-4">
              <User className="text-blue-300" size={20} />
              <div>
                <p className="text-sm text-blue-100/55">Name</p>
                <p className="font-bold">{session.user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/7 p-4">
              <Mail className="text-blue-300" size={20} />
              <div>
                <p className="text-sm text-blue-100/55">Email</p>
                <p className="font-bold">{session.user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/7 p-4">
              <ShieldCheck className="text-blue-300" size={20} />
              <div>
                <p className="text-sm text-blue-100/55">Session</p>
                <p className="font-bold">Active local session</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
