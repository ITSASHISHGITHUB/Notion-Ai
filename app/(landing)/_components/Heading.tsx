"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRight, Github, Linkedin, Code2, Zap, ExternalLink, X, FileText, User, MapPin, GraduationCap, Briefcase } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DevBadge = () => (
  <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-400">
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
    </span>
    Open to opportunities
  </div>
);

const RESUME_PREVIEW_URL =
  "https://drive.google.com/file/d/1pDlY8FS3yLIHqa8TdBANJQZXnjwqyvvm/preview";

const ResumeModal = ({ onClose }: { onClose: () => void }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

    {/* Modal frame */}
    <div
      className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-900"
      style={{ height: "88vh" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white">
            AY
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Ashish Yadav — Resume
            </p>
            <p className="text-xs text-neutral-400">Frontend Developer · 2.5 yrs exp</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://drive.google.com/file/d/1pDlY8FS3yLIHqa8TdBANJQZXnjwqyvvm/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-all hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open in Drive
          </a>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-all hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Iframe */}
      <div className="flex-1 bg-neutral-100 dark:bg-neutral-950">
        <iframe
          src={RESUME_PREVIEW_URL}
          className="h-full w-full border-0"
          allow="autoplay"
          title="Ashish Yadav Resume"
        />
      </div>
    </div>
  </div>
);

const AboutMe = ({ onViewResume }: { onViewResume: () => void }) => (
  <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-5 shadow-sm dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
    {/* Top accent */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-70" />

    {/* Section label */}
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-indigo-500" />
        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          About Me
        </span>
      </div>
      <button
        onClick={onViewResume}
        className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 transition-all hover:-translate-y-0.5 hover:shadow-sm dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-400"
      >
        <FileText className="h-3.5 w-3.5" />
        View Resume
      </button>
    </div>

    {/* Bio */}
    <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
      Hey! I&apos;m a passionate Frontend Developer based in{" "}
      <span className="inline-flex items-center gap-1 font-medium text-neutral-800 dark:text-neutral-200">
        <MapPin className="h-3 w-3 text-rose-400" /> Bengaluru, India
      </span>{" "}
      with 2.5 years of experience building fast, scalable web apps. I love crafting
      pixel-perfect UIs and shipping products that users enjoy.
    </p>

    {/* Info grid */}
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="flex items-start gap-2.5 rounded-lg bg-neutral-100/70 p-3 dark:bg-neutral-800/50">
        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
        <div>
          <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Education
          </p>
          <p className="text-xs text-neutral-500">
            B.E · Brindavan College of Engineering (VTU) · GPA 7.76
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2.5 rounded-lg bg-neutral-100/70 p-3 dark:bg-neutral-800/50">
        <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
        <div>
          <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Current Role
          </p>
          <p className="text-xs text-neutral-500">
            Frontend Dev · WeSage / MCQMarkets · Full-stack features
          </p>
        </div>
      </div>
    </div>

    {/* Tech tags */}
    <div className="mt-3 flex flex-wrap gap-1.5">
      {["Next.js 15", "TypeScript", "React 18", "NestJS", "Docker", "Jest", "TailwindCSS", "Redis"].map(
        (tech) => (
          <span
            key={tech}
            className="rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
          >
            {tech}
          </span>
        )
      )}
    </div>
  </div>
);

const BuiltByBanner = () => (
  <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
    {/* Decorative accent */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-60" />

    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: Identity */}
      <div className="flex items-center gap-3">
        {/* Avatar placeholder with initials */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white shadow-inner">
          AY
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Ashish Yadav
            </span>
            <DevBadge />
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Frontend Developer · Next.js · TypeScript · React
          </p>
        </div>
      </div>

      {/* Right: Links */}
      <div className="flex items-center gap-2 pl-[52px] sm:pl-0">
        <a
          href="https://github.com/ITSASHISHGITHUB"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600"
        >
          <Github className="h-3.5 w-3.5" />
          GitHub
          <ExternalLink className="h-3 w-3 opacity-50" />
        </a>
        <a
          href="https://linkedin.com/in/Ashishyadav677"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400"
        >
          <Linkedin className="h-3.5 w-3.5" />
          LinkedIn
          <ExternalLink className="h-3 w-3 opacity-50" />
        </a>
      </div>
    </div>

    {/* Stats row */}
    <div className="mt-3 flex flex-wrap gap-3 border-t border-neutral-100 pt-3 dark:border-neutral-800">
      {[
        { icon: <Zap className="h-3 w-3" />, label: "64% faster load time at XpressBees" },
        { icon: <Code2 className="h-3 w-3" />, label: "2.5 yrs · Next.js · NestJS · Docker" },
      ].map(({ icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-500"
        >
          <span className="text-violet-500">{icon}</span>
          {label}
        </span>
      ))}
    </div>
  </div>
);

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}

      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold sm:text-5xl md:text-5xl">
          Your Ideas💡, Documents📕, & Plans🚀. Welcome to{" "}
          <span className="underline">Notion Ai</span>
        </h1>
        <h2 className="text-base font-medium sm:text-xl">
          Notion Ai is the connected workspace where <br /> better, faster work
          happens.
        </h2>

        {isLoading && (
          <div className="flex w-full items-center justify-center">
            <Spinner size="md" />
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <Button asChild>
            <Link href="/documents">
              Enter Notion Ai
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
        {!isAuthenticated && !isLoading && (
          <SignUpButton mode="modal">
            <Button>
              Get Notion Ai free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </SignUpButton>
        )}

        {/* About Me card */}
        <AboutMe onViewResume={() => setResumeOpen(true)} />

        {/* Developer credit banner */}
        <BuiltByBanner />
      </div>
    </>
  );
};