"use client";

import { ChevronDown, FileText, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearSession, getSession, type AuthSession } from "@/lib/auth";

export default function LandingUserMenu() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setSession(getSession());
    });
  }, []);

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setIsOpen(false);
    router.push("/");
  };

  if (!session) {
    return (
      <Link
        href="/login"
        className="rounded-full border border-white/20 bg-white px-5 py-2 text-sm font-semibold text-[#08122f] shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-50"
      >
        Log in
      </Link>
    );
  }

  const initials = session.user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 py-1.5 pl-1.5 pr-4 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition hover:bg-white/15"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-black text-blue-600">
          {initials}
        </span>
        <span className="hidden max-w-28 truncate sm:inline">{session.user.name}</span>
        <ChevronDown
          size={16}
          className={`transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-14 z-30 w-64 rounded-3xl border border-white/10 bg-[#07112d]/95 p-3 text-left shadow-2xl shadow-blue-950/50 backdrop-blur">
          <div className="border-b border-white/10 px-3 pb-3">
            <p className="font-bold text-white">{session.user.name}</p>
            <p className="mt-1 truncate text-xs text-blue-100/55">
              {session.user.email}
            </p>
          </div>

          <Link
            href="/notes"
            onClick={() => setIsOpen(false)}
            className="mt-3 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-blue-100 transition hover:bg-white/10 hover:text-white"
          >
            <FileText size={17} />
            Open notes
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-red-100 transition hover:bg-red-500/10"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
