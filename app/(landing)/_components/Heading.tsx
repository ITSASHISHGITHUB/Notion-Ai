"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  ArrowRight,
  X,
  ExternalLink,
  FileText,
  MessageCircle,
  Send,
  Bot,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import MuiButton from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

/* ─────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────── */
const RESUME_PREVIEW_URL =
  "https://drive.google.com/file/d/1pDlY8FS3yLIHqa8TdBANJQZXnjwqyvvm/preview";
const RESUME_VIEW_URL =
  "https://drive.google.com/file/d/1pDlY8FS3yLIHqa8TdBANJQZXnjwqyvvm/view";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/* ─────────────────────────────────────────────────────────────
   ViewCounter
───────────────────────────────────────────────────────────── */
function ViewCounter() {
  const count = useQuery(api.views.getCount);
  const increment = useMutation(api.views.increment);

  useEffect(() => {
    increment();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (count === undefined) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
      {/* Live green dot */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>

      <span>
        <span className="font-semibold text-neutral-700 dark:text-neutral-300">
          {count.toLocaleString()}
        </span>{" "}
        {count === 1 ? "live visit" : "live visits"}
      </span>
    </div>
  );
}

function ChatBot({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Ashish's AI assistant. Ask me anything about his skills, experience, or projects! 👋",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply = data?.reply ?? "Sorry, I couldn't get a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!open && (
        <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
          <Tooltip title="Chat with Ashish's AI" placement="left">
            <button
              onClick={() => setOpen(true)}
              style={{ width: 52, height: 52 }}
              className="relative flex items-center justify-center rounded-full bg-indigo-600 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-indigo-500"
            >
              <MessageCircle className="h-5 w-5 text-white" />
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-20" />
            </button>
          </Tooltip>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-900"
          style={{
            bottom: "1.25rem",
            right: "1.25rem",
            width: "calc(100vw - 2.5rem)",
            maxWidth: "24rem",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Ashish&apos;s Assistant
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <p className="text-xs text-indigo-200">Online</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex h-64 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                    <Bot className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed sm:text-sm ${msg.role === "user"
                    ? "rounded-br-sm bg-indigo-600 text-white"
                    : "rounded-bl-sm bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-end gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <Bot className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-neutral-100 px-4 py-3 dark:bg-neutral-800">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-neutral-100 p-3 dark:border-neutral-800">
            <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-neutral-800 placeholder-neutral-400 outline-none dark:text-neutral-200 disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-neutral-400">
              Powered by GroqCloud
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-900"
        style={{ height: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              AY
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Ashish Yadav — Resume
              </p>
              <p className="text-xs text-neutral-400">
                Frontend Developer · 2.5 yrs exp
              </p>
            </div>
          </div>
          <div className="ml-2 flex shrink-0 items-center gap-1.5">
            <MuiButton
              href={RESUME_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              startIcon={<ExternalLink size={13} />}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                textTransform: "none",
                fontSize: "0.7rem",
                fontWeight: 500,
                borderRadius: "8px",
                borderColor: "#e5e7eb",
                color: "#374151",
                px: 1.5,
                "&:hover": { borderColor: "#6366f1", color: "#6366f1" },
              }}
            >
              Open in Drive
            </MuiButton>
            <Tooltip title="Open in Drive">
              <IconButton
                href={RESUME_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ display: { xs: "flex", sm: "none" } }}
              >
                <ExternalLink size={15} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton onClick={onClose} size="small">
                <X size={15} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
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
}


function BuiltByBanner({ onViewResume, onOpenChat }: { onViewResume: () => void; onOpenChat: () => void }) {
  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      {/* Identity row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow">
            AY
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Ashish Yadav
            </span>
            {/* Chip — bigger, below name */}
            <Chip
              label="Open to opportunities"
              size="small"
              icon={
                <span style={{ display: "flex", alignItems: "center", paddingLeft: "6px" }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                </span>
              }
              sx={{
                fontSize: "0.68rem",
                height: "22px",
                width: "fit-content",
                backgroundColor: "rgba(34,197,94,0.12)",
                color: "#16a34a",
                border: "1px solid rgba(34,197,94,0.3)",
                fontWeight: 500,
                "& .MuiChip-label": { px: 1 },
                "& .MuiChip-icon": { ml: 0 },
              }}
            />
          </div>
        </div>

        {/* Chat button — right side */}
        <Tooltip title="Chat with Ashish's AI" placement="left">
          <button
            onClick={onOpenChat}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 shadow transition-all duration-200 hover:scale-110 hover:bg-indigo-500"
          >
            <MessageCircle className="h-4 w-4 text-white" />
          </button>
        </Tooltip>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-neutral-100 dark:border-neutral-800" />

      {/* Buttons */}
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <MuiButton
          href="https://github.com/ITSASHISHGITHUB"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="small"
          startIcon={<GitHubIcon sx={{ fontSize: "0.95rem !important" }} />}
          sx={{
            textTransform: "none",
            fontSize: "0.72rem",
            fontWeight: 500,
            borderRadius: "8px",
            borderColor: "#e5e7eb",
            color: "#374151",
            px: 1.5,
            minWidth: 0,
            width: { xs: "100%", sm: "auto" },
            "&:hover": {
              borderColor: "#6366f1",
              color: "#6366f1",
              backgroundColor: "rgba(99,102,241,0.04)",
            },
          }}
        >
          GitHub
        </MuiButton>

        <MuiButton
          href="https://linkedin.com/in/Ashishyadav677"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="small"
          startIcon={<LinkedInIcon sx={{ fontSize: "0.95rem !important" }} />}
          sx={{
            textTransform: "none",
            fontSize: "0.72rem",
            fontWeight: 500,
            borderRadius: "8px",
            borderColor: "#e5e7eb",
            color: "#374151",
            px: 1.5,
            minWidth: 0,
            width: { xs: "100%", sm: "auto" },
            "&:hover": {
              borderColor: "#6366f1",
              color: "#6366f1",
              backgroundColor: "rgba(99,102,241,0.04)",
            },
          }}
        >
          LinkedIn
        </MuiButton>

        <MuiButton
          onClick={onViewResume}
          variant="contained"
          size="small"
          startIcon={<FileText size={12} />}
          sx={{
            textTransform: "none",
            fontSize: "0.72rem",
            fontWeight: 500,
            borderRadius: "8px",
            backgroundColor: "#6366f1",
            boxShadow: "none",
            px: 1.5,
            minWidth: 0,
            width: { xs: "100%", sm: "auto" },
            ml: { xs: 0, sm: "auto" },
            "&:hover": { backgroundColor: "#4f46e5", boxShadow: "none" },
          }}
        >
          Resume
        </MuiButton>
      </div>
    </div>
  );
}
export default function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      <ChatBot open={chatOpen} setOpen={setChatOpen} />

      <div className="w-full max-w-3xl space-y-5 px-4 sm:px-0">

        <ViewCounter />

        <div className="space-y-3">
          <h1 className="text-[1.6rem] font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Write. Plan. Collaborate.{" "}
            <span className="underline decoration-indigo-400 underline-offset-4">
              All in one place.
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            Notion AI brings your notes, tasks, and docs together in one smart
            workspace — so you spend less time organizing and more time doing.
          </p>
        </div>

        {isLoading && (
          <div className="flex w-full items-center justify-center">
            <Spinner size="md" />
          </div>
        )}

        {isAuthenticated && !isLoading && (
          <Button asChild>
            <Link href="/documents">
              Take me in
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}

        {!isAuthenticated && !isLoading && (
          <SignUpButton mode="modal">
            <Button>
              Take me in
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </SignUpButton>
        )}

        <BuiltByBanner
          onViewResume={() => setResumeOpen(true)}
          onOpenChat={() => setChatOpen(true)}
        />

      </div>
    </>
  );
}