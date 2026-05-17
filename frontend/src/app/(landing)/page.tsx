import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  FileUp,
  HelpCircle,
  ImagePlus,
  Quote,
  SearchCheck,
  Share2,
  Sparkles,
  Star,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  magnifyingFeatureImage,
  noteFeatureImage,
  notebookFeatureImage,
  rocketFeatureImage,
} from "@/assests";
import LandingHeroCta, { SmartGetStartedLink } from "./landing-hero-cta";
import LandingUserMenu from "./landing-user-menu";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Q&A", href: "#qna" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "#support" },
];

const uniqueNavItems = navItems.filter(
  (item, index, items) =>
    items.findIndex((navItem) => navItem.label === item.label) === index,
);

const features = [
  {
    title: "Easy to save files and bookmarks",
    description:
      "Upload class notes, PDFs, links, and useful references into one clean workspace so everything stays ready when you need it.",
    action: "Upload your notes",
    href: "/notes/new",
    icon: FileUp,
    image: rocketFeatureImage,
    imageHint: "3D rocket, cloud upload, or file stack illustration",
  },
  {
    title: "Share your notes and help others",
    description:
      "Publish helpful notes with classmates, build shared study material, and make learning easier for your whole group.",
    action: "View and share notes",
    href: "/shared-notes",
    icon: Share2,
    image: noteFeatureImage,
    imageHint: "3D notebook, students, or connected notes illustration",
  },
  {
    title: "Turn long notes into smart summaries",
    description:
      "Let AI pull out key points, action items, and quick revision blocks from messy lecture notes or uploaded content.",
    action: "Generate summary",
    href: "/notes",
    icon: BookOpenCheck,
    image: notebookFeatureImage,
    imageHint: "AI document summary card or glowing notebook",
  },
  {
    title: "Find any topic in seconds",
    description:
      "Search across notes, files, and bookmarks with context-aware results that help you jump back into the right idea fast.",
    action: "Search smarter",
    href: "/notes",
    icon: SearchCheck,
    image: magnifyingFeatureImage,
    imageHint: "Magnifying glass over notes or dashboard search UI",
  },
];

const faqs = [
  {
    question: "What can I upload in Notely?",
    answer:
      "You can save notes, study files, useful links, bookmarks, and reference material in one place so your learning content stays organized.",
  },
  {
    question: "How does AI help with my notes?",
    answer:
      "Notely can turn long notes into short summaries, highlight key ideas, and help you revise faster without reading everything again from scratch.",
  },
  {
    question: "Can I share my notes with other students?",
    answer:
      "Yes. The sharing feature is designed so students can publish helpful notes, collaborate with classmates, and support others studying the same topic.",
  },
  {
    question: "Will search work across files and bookmarks?",
    answer:
      "Yes. The goal is to let you search across your saved notes, uploaded files, and bookmarked resources so you can find the right topic quickly.",
  },
  {
    question: "Is Notely only for students?",
    answer:
      "Notely is built with students in mind, but anyone who collects notes, resources, research, or learning material can use it.",
  },
  {
    question: "Is my content private?",
    answer:
      "Your personal workspace content should stay private unless you choose to share it. Shared notes can be made available for others to view.",
  },
];

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Computer Science Student",
    initials: "AM",
    review:
      "Notely helped me turn messy lecture notes into clean summaries before exams. I can find topics much faster now.",
  },
  {
    name: "Priya Sharma",
    role: "Medical Aspirant",
    initials: "PS",
    review:
      "The upload and bookmark flow feels simple. I keep notes, PDFs, and important links together instead of searching everywhere.",
  },
  {
    name: "Kabir Singh",
    role: "Study Group Lead",
    initials: "KS",
    review:
      "Sharing notes with my group became much easier. Everyone can revise from the same organized material.",
  },
  {
    name: "Neha Kapoor",
    role: "Design Student",
    initials: "NK",
    review:
      "The interface feels calm and modern. It makes studying feel less scattered and more focused.",
  },
  {
    name: "Rohan Verma",
    role: "MBA Student",
    initials: "RV",
    review:
      "Smart search is the feature I needed most. I can jump back to saved references without wasting time.",
  },
  {
    name: "Sara Khan",
    role: "Engineering Student",
    initials: "SK",
    review:
      "AI summaries are perfect for quick revision. It gives me the main points without losing the structure of my notes.",
  },
];

const ctaBenefits = [
  "AI summaries for faster revision",
  "Upload notes, files, and bookmarks",
  "Share useful study material with others",
];

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Home", href: "#home" },
      { label: "Features", href: "#features" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Q&A", href: "#qna" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Notes", href: "/notes" },
      { label: "Insights", href: "/insights" },
      { label: "Shared Notes", href: "/shared-notes" },
      { label: "Profile", href: "/profile" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Login", href: "/login" },
      { label: "Signup", href: "/signup" },
      { label: "Support", href: "#support" },
      { label: "Security", href: "#qna" },
    ],
  },
];

type Feature = {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  image?: StaticImageData;
  imageHint: string;
};

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08122f] text-white">
      <section id="home" className="relative min-h-screen px-4 py-5 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,144,255,0.34),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(104,92,255,0.24),transparent_30%),linear-gradient(180deg,#07112d_0%,#0a1433_54%,#050913_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[34px_34px] opacity-60" />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl flex-col rounded-4xl border border-white/10 bg-white/3 px-5 py-5 shadow-2xl shadow-blue-950/40 backdrop-blur sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-blue-600">
                <BrainCircuit size={22} />
              </span>
              <span className="text-xl font-black tracking-tight">Notely</span>
            </Link>

            <nav className="hidden max-w-2xl items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-blue-100 lg:flex">
              {uniqueNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-3.5 py-2 transition hover:bg-white/10 hover:text-white first:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <LandingUserMenu />
          </header>

          <div className="relative flex flex-1 items-center justify-center py-16 text-center lg:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200">
                <Sparkles size={16} />
                Take note using AI
              </div>

              <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
                The Future of{" "}
                <span className="font-serif italic text-blue-400">Note</span>
                <br />
                <span className="font-serif italic text-blue-400">Taking Starts</span>{" "}
                With AI
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-100/80 sm:text-lg">
                Capture ideas, summarize lessons, and organize your study flow
                with an intelligent notes workspace that adapts to how you learn.
              </p>

              <LandingHeroCta />

              <div className="mt-16 flex items-center justify-center">
                <div className="flex -space-x-3">
                  {["AI", "NO", "TE", "S"].map((label) => (
                    <div
                      key={label}
                      className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#08122f] bg-linear-to-br from-blue-200 to-blue-600 text-xs font-black text-white"
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <p className="ml-5 max-w-xs text-left text-2xl font-semibold leading-tight text-white">
                  Empower Your Mind
                  <br />
                  with AI Results.
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-8 left-0 hidden w-56 rounded-3xl border border-white/10 bg-blue-500 p-4 text-left shadow-2xl shadow-blue-950/60 lg:block">
              <p className="text-xs font-semibold text-blue-100">Your Progress</p>
              <p className="mt-1 text-3xl font-black">$15,437</p>
              <div className="mt-5 flex h-24 items-end gap-2">
                {[44, 72, 52, 63, 48, 88, 38].map((height, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-t-lg bg-white/85"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[10px] text-blue-100">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-4 right-0 hidden w-64 rounded-3xl border border-white/10 bg-blue-500/90 p-4 text-left shadow-2xl shadow-blue-950/60 lg:block">
              <div className="flex items-center justify-between text-xs text-blue-100">
                <span>AI Summary</span>
                <span>Learning</span>
              </div>
              <div className="mt-5 rounded-2xl bg-white/10 p-5 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-100">
                  Notes reviewed
                </p>
                <p className="mt-3 text-4xl font-black">100%</p>
                <p className="mt-2 text-xs text-blue-100">+43.8% this week</p>
              </div>
              <div className="mt-4 space-y-2 text-xs text-blue-50">
                <div className="flex justify-between">
                  <span>Focus score</span>
                  <span>92.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Flashcards built</span>
                  <span>81.00</span>
                </div>
              </div>
              <div className="mt-4 rounded-full bg-white py-2 text-center text-xs font-bold text-blue-600">
                Generate
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.18),transparent_30%),radial-gradient(circle_at_85%_45%,rgba(96,165,250,0.15),transparent_32%),linear-gradient(180deg,#050913_0%,#08122f_52%,#050913_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[42px_42px] opacity-20" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-300">
              Features
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">
              Everything you need to study smarter
            </h2>
            <p className="mt-5 text-base leading-7 text-blue-100/70 sm:text-lg">
              Notely brings uploads, bookmarks, AI summaries, sharing, and fast
              search together in one calm notes workspace.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {(features as Feature[]).map((feature, index) => {
              const Icon = feature.icon;
              const isLarge = index < 2;

              return (
                <article
                  key={feature.title}
                  className={`group relative overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur transition hover:-translate-y-1 hover:border-blue-300/30 ${
                    isLarge ? "min-h-[520px]" : "min-h-[420px]"
                  }`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.24),transparent_34%)] opacity-80" />
                  <div className="relative grid h-full gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
                    <div className={index % 2 === 1 ? "md:order-2" : ""}>
                      <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                        {feature.title}
                      </h3>
                      <p className="mt-5 max-w-md text-sm leading-7 text-blue-100/60 sm:text-base">
                        {feature.description}
                      </p>
                      <Link
                        href={feature.href}
                        className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
                      >
                        {feature.action}
                        <ArrowRight size={14} />
                      </Link>
                    </div>

                    <div className={index % 2 === 1 ? "md:order-1" : ""}>
                      <div className="relative mx-auto grid aspect-square max-w-sm place-items-center overflow-hidden rounded-4xl border border-white/10 bg-[#0b1738]/80 shadow-2xl shadow-blue-950/50">
                        <div className="absolute inset-6 rounded-3xl bg-blue-500/20 blur-2xl" />
                        <div
                          className={`relative grid h-full w-full place-items-center rounded-3xl text-center ${
                            feature.image
                              ? "p-0"
                              : "border border-dashed border-blue-200/25 bg-white/4 p-6"
                          }`}
                        >
                          {feature.image ? (
                            <Image
                              src={feature.image}
                              alt={`${feature.title} illustration`}
                              className="h-full w-full scale-105 object-contain drop-shadow-2xl transition duration-300 group-hover:scale-110"
                              priority={index === 0}
                            />
                          ) : (
                            <div>
                              <ImagePlus className="mx-auto text-blue-300" size={44} />
                              <div className="mt-4">
                                <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">
                                  Image Space
                                </p>
                                <p className="mt-3 text-sm leading-6 text-blue-100/55">
                                  {feature.imageHint}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="qna" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.22),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.18),transparent_30%),linear-gradient(180deg,#050913_0%,#07112d_50%,#050913_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[38px_38px] opacity-15" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-4xl border border-white/10 bg-white/4 p-8 shadow-2xl shadow-blue-950/30 backdrop-blur">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
              <HelpCircle size={28} />
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.35em] text-blue-300">
              Q&A
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              Questions before you start?
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-blue-100/65">
              Here are the common things students usually ask before using an AI
              notes workspace like Notely.
            </p>
            <SmartGetStartedLink
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-400"
            >
              Start learning smarter
              <ArrowRight size={16} />
            </SmartGetStartedLink>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-blue-950/20 backdrop-blur transition open:border-blue-300/30 open:bg-blue-500/10"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-bold text-white">
                  {faq.question}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-blue-200 transition group-open:rotate-45 group-open:bg-blue-500 group-open:text-white">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100/65">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.24),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(96,165,250,0.14),transparent_28%),linear-gradient(180deg,#050913_0%,#08122f_48%,#050913_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[36px_36px] opacity-15" />
        <div className="absolute left-1/2 top-44 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-300">
              Student Reviews
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">
              Students are already studying with more clarity
            </h2>
            <p className="mt-5 text-base leading-7 text-blue-100/70 sm:text-lg">
              See how students use Notely to keep notes clean, revise faster,
              and share useful study material with their groups.
            </p>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="testimonial-float relative overflow-hidden rounded-[2.5rem] border border-blue-300/20 bg-blue-500/10 p-8 shadow-2xl shadow-blue-950/40 backdrop-blur">
              <div className="absolute right-8 top-8 text-blue-300/40">
                <Quote size={52} />
              </div>
              <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-blue-500/25 blur-3xl" />
              <div className="relative">
                <div className="flex gap-1 text-blue-300">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={18} className="fill-current" />
                  ))}
                </div>
                <p className="mt-8 text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
                  “{testimonials[0].review} Notely feels like a study partner
                  that keeps everything clean and ready.”
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-blue-200 via-blue-500 to-indigo-700 text-base font-black text-white shadow-lg shadow-blue-500/30">
                    <span className="absolute inset-0 rounded-2xl bg-white/20 blur-sm" />
                    <span className="relative">{testimonials[0].initials}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {testimonials[0].name}
                    </h3>
                    <p className="text-sm text-blue-100/65">
                      {testimonials[0].role}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <div className="grid gap-5 sm:grid-cols-2">
              {testimonials.slice(1, 5).map((testimonial, index) => (
                <article
                  key={testimonial.name}
                  className="testimonial-float rounded-4xl border border-white/10 bg-white/6 p-5 shadow-xl shadow-blue-950/20 backdrop-blur transition hover:-translate-y-1 hover:border-blue-300/30 hover:bg-blue-500/10"
                  style={{ animationDelay: `${index * 0.35}s` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500 text-xs font-black text-white shadow-lg shadow-blue-500/25">
                        {testimonial.initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{testimonial.name}</h3>
                        <p className="text-xs text-blue-100/55">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <Quote size={22} className="shrink-0 text-blue-300/60" />
                  </div>
                  <div className="mt-5 flex gap-1 text-blue-300">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={14} className="fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-blue-50/75">
                    “{testimonial.review}”
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 rounded-4xl border border-white/10 bg-white/4 p-5 backdrop-blur md:grid-cols-3">
            {[
              ["12k+", "notes organized"],
              ["4.9/5", "average student rating"],
              ["3x", "faster revision flow"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl bg-white/5 p-5 text-center">
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="mt-2 text-sm text-blue-100/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(59,130,246,0.28),transparent_32%),linear-gradient(180deg,#050913_0%,#08122f_48%,#020617_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[36px_36px] opacity-20" />

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 px-6 py-14 text-center shadow-2xl shadow-blue-950/40 backdrop-blur sm:px-10 lg:px-16">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="absolute inset-x-8 bottom-0 h-px bg-linear-to-r from-transparent via-blue-300/50 to-transparent" />

          <div className="relative mx-auto max-w-4xl">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200">
              <Sparkles size={16} />
              Ready when your notes are
            </div>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Start building your smarter study workspace today.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-100/70 sm:text-lg">
              Bring your notes, files, bookmarks, and AI tools together in one
              place designed for focused learning.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <SmartGetStartedLink
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-400"
              >
                Get started free
                <ArrowRight size={17} />
              </SmartGetStartedLink>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                I already have an account
              </Link>
            </div>

            <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
              {ctaBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-blue-50"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-blue-300" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer id="support" className="relative overflow-hidden px-4 pt-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#020617_0%,#050913_45%,#020617_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[40px_40px] opacity-15" />
        <div className="absolute left-1/2 top-36 h-[520px] w-[150vw] -translate-x-1/2 rounded-[100%_100%_0_0] border-t border-blue-300/50 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.75)_0%,rgba(37,99,235,0.34)_24%,rgba(8,18,47,0.7)_44%,rgba(2,6,23,0.95)_70%)] shadow-[0_-30px_90px_rgba(59,130,246,0.6)]" />
        <div className="absolute left-1/2 top-32 h-2 w-[80vw] -translate-x-1/2 rounded-full bg-blue-300/80 blur-sm" />

        <div className="relative mx-auto max-w-7xl pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mx-auto mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-200">
              Notely
            </p>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              Where notes become progress.
            </h2>
            <p className="mt-5 text-base leading-7 text-blue-100/70">
              Built for students who want clarity, speed, and better learning
              flow from every note they save.
            </p>
          </div>

          <div className="mt-24 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-blue-600">
                  <BrainCircuit size={22} />
                </span>
                <span className="text-xl font-black tracking-tight">Notely</span>
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100/65">
                Built with clarity. Designed for focused notes, smart summaries,
                and shared learning.
              </p>
              <div className="mt-6 flex max-w-md flex-wrap gap-3">
                <SmartGetStartedLink className="rounded-full bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400">
                  Get started
                </SmartGetStartedLink>
                <Link
                  href="#features"
                  className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  Explore features
                </Link>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-bold text-white">{group.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-blue-100/60">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="transition hover:text-white">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-blue-100/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Notely. All rights reserved.</p>
            <p>AI notes workspace for smarter learning.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
