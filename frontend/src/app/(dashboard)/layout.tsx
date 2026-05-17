import {
  BrainCircuit,
  FileText,
  Home,
  LineChart,
  Settings,
  Share2,
} from "lucide-react";
import Link from "next/link";

const dashboardLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Notes", href: "/notes", icon: FileText },
  { label: "Insights", href: "/insights", icon: LineChart },
  { label: "Shared Notes", href: "/shared-notes", icon: Share2 },
  { label: "Profile", href: "/profile", icon: Settings },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#050913] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(74,144,255,0.22),transparent_30%),linear-gradient(180deg,#07112d_0%,#050913_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[36px_36px] opacity-15" />

      <div className="flex min-h-screen w-full gap-5 px-4 py-5 sm:px-6">
        <aside className="sticky top-5 hidden h-[calc(100vh-2.5rem)] w-64 shrink-0 flex-col rounded-4xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur lg:flex">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-blue-600">
              <BrainCircuit size={24} />
            </span>
            <span className="text-2xl font-black tracking-tight">Notely</span>
          </Link>

          <nav className="mt-10 space-y-2 text-sm font-semibold text-blue-100/70">
            {dashboardLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-white/8 hover:text-white"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-3xl border border-blue-300/20 bg-blue-500/10 p-4">
            <p className="text-sm font-bold text-white">Workspace flow</p>
            <p className="mt-2 text-sm leading-6 text-blue-100/60">
              Pick a note, write in the center, use AI and sharing on the right.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 grid grid-cols-2 gap-2 rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-blue-950/20 backdrop-blur sm:grid-cols-4 lg:hidden">
            {dashboardLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-bold text-blue-100/75 transition hover:bg-blue-500 hover:text-white"
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
