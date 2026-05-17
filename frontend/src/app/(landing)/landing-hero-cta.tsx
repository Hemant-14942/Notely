"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";

export default function LandingHeroCta() {
  const router = useRouter();

  const handleGetStarted = () => {
    const session = getSession();
    router.push(session ? "/notes" : "/signup");
  };

  return (
    <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <button
        type="button"
        onClick={handleGetStarted}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-400 sm:w-auto"
      >
        Get Started
        <ArrowRight size={17} />
      </button>
      <Link
        href="#features"
        className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-white/15 sm:w-auto"
      >
        Explore Features
      </Link>
    </div>
  );
}

export function SmartGetStartedLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    const session = getSession();
    router.push(session ? "/notes" : "/signup");
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
