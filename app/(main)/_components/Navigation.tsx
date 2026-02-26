"use client";

import React, { ComponentRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { DocumentList } from "./DocumentList";
import { Item } from "./Item";
import { UserItem } from "./UserItem";

import { toast } from "sonner";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
  Sparkles,
  X,
  Brain,
  Zap,
  Shield,
  GitBranch,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TrashBox } from "./TrashBox";
import { useSearch } from "@/hooks/useSearch";
import { useSettings } from "@/hooks/useSettings";
import { Navbar } from "./Navbar";
import { ScrollableList } from "@/components/scrollable-list";

const TECH_STACK = [
  {
    icon: <Brain className="h-4 w-4" />,
    name: "Claude 3.5 Sonnet",
    tag: "Core LLM",
    desc: "Anthropic's most intelligent model for reasoning, writing & analysis",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: <Zap className="h-4 w-4" />,
    name: "Vercel AI SDK",
    tag: "Streaming",
    desc: "Edge-native streaming responses with useChat & generateText hooks",
    color: "from-yellow-400 to-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    text: "text-orange-600 dark:text-orange-400",
  },
  {
    icon: <GitBranch className="h-4 w-4" />,
    name: "LangChain.js",
    tag: "Orchestration",
    desc: "Chains, agents & memory for complex multi-step AI workflows",
    color: "from-green-400 to-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: <Shield className="h-4 w-4" />,
    name: "Pinecone",
    tag: "Vector DB",
    desc: "Semantic search & long-term memory via high-dim vector embeddings",
    color: "from-blue-400 to-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: <BarChart3 className="h-4 w-4" />,
    name: "OpenAI Embeddings",
    tag: "Embeddings",
    desc: "text-embedding-3-large for semantic document understanding",
    color: "from-slate-400 to-slate-600",
    bg: "bg-slate-50 dark:bg-slate-900/40",
    text: "text-slate-600 dark:text-slate-400",
  },
  {
    icon: <MessageSquare className="h-4 w-4" />,
    name: "Convex + AI",
    tag: "Real-time",
    desc: "Live AI responses synced in real-time across all connected clients",
    color: "from-pink-400 to-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-600 dark:text-rose-400",
  },
];

const AITechPopup = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl dark:bg-neutral-950"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-6 pb-6 pt-5">
          {/* Decorative blobs */}
          <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/10 blur-xl" />
          <div className="absolute bottom-0 left-10 h-16 w-16 rounded-full bg-pink-400/20 blur-lg" />

          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-tight text-white">
                  AI Assistant
                </h2>
                <p className="text-xs font-medium text-violet-200">
                  Powered by next-gen AI stack
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Status chip */}
          <div className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-xs font-semibold text-white/90">
              Under active development — coming soon
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-0 px-5 py-4">
          <p className="mb-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            Here's the cutting-edge AI infrastructure we're integrating to bring
            you a truly intelligent workspace:
          </p>

          <div className="space-y-2">
            {TECH_STACK.map(({ icon, name, tag, desc, color, bg, text }) => (
              <div
                key={name}
                className="group flex items-center gap-3 rounded-2xl border border-neutral-100 bg-neutral-50/60 px-3.5 py-3 transition-all hover:border-neutral-200 hover:bg-neutral-100/60 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-700 dark:hover:bg-neutral-900/80"
              >
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm",
                    color,
                  )}
                >
                  <span className="text-white">{icon}</span>
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-100">
                      {name}
                    </p>
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                        bg,
                        text,
                      )}
                    >
                      {tag}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-[10px] text-neutral-400 dark:text-neutral-500">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-neutral-100 px-5 py-3 dark:border-neutral-800">
          <p className="text-[10px] text-neutral-400">
            Built by{" "}
            <span className="font-semibold text-violet-500">Ashish Yadav</span>{" "}
            · Bengaluru 🇮🇳
          </p>
          <button
            onClick={onClose}
            className="rounded-lg bg-neutral-100 px-3 py-1 text-[10px] font-medium text-neutral-500 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

const AIComingSoonItem = ({ onClick }: { onClick: () => void }) => (
  <div className="flex w-full min-h-[27px] cursor-not-allowed items-center px-3 py-1 opacity-60">
    {/* Purple icon */}
    <div className="mr-2 flex h-[18px] w-[18px] shrink-0 items-center justify-center">
      <Sparkles className="h-[18px] w-[18px] text-violet-500 dark:text-violet-400" />
    </div>

    {/* Purple label with disabled style */}
    <span className="truncate text-sm font-medium text-violet-500 line-through decoration-violet-300 dark:text-violet-400 dark:decoration-violet-600">
      AI Assistant
    </span>

    {/* Red clickable chip */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="ml-auto inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600 transition-all hover:scale-105 hover:border-red-300 hover:bg-red-100 hover:shadow-sm active:scale-95 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/40"
      style={{ cursor: "pointer" }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
      </span>
      Soon
    </button>
  </div>
);

const Navigation = () => {
  const search = useSearch();
  const settings = useSettings();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);
  const [aiPopupOpen, setAiPopupOpen] = useState(false);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ComponentRef<"aside">>(null);
  const navbarRef = useRef<ComponentRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) collapse();
    else resetWidth();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [pathname, isMobile]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.removeProperty("width");
      navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100%-240px)");
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );
    toast.promise(promise, {
      loading: "Creating a new note....",
      success: "New note created.",
      error: "Failed to create a note.",
    });
  };

  return (
    <>
      <AITechPopup open={aiPopupOpen} onClose={() => setAiPopupOpen(false)} />

      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar bg-secondary relative z-300 flex h-full w-60 flex-col overflow-hidden overflow-x-hidden pb-4",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "w-0",
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "text-muted-foreground absolute top-3 right-2 h-6 w-6 rounded-sm opacity-0 transition group-hover/sidebar:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600",
            isMobile && "opacity-100",
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <AIComingSoonItem onClick={() => setAiPopupOpen(true)} />
          <Item onClick={handleCreate} label="New page" icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <div>
            <ScrollableList>
              <DocumentList />
            </ScrollableList>
          </div>
          <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          <Popover>
            <PopoverTrigger className="mt-3 w-full">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "bottom" : "right"}
              className="w-72 p-0"
              collisionPadding={16}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="bg-primary/10 absolute top-0 right-0 h-full w-1 cursor-ew-resize opacity-0 transition group-hover/sidebar:opacity-100"
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 left-60 z-40 w-[calc(100%-240px)]",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "left-0 w-full",
        )}
      >
        {!!params.documentId ? (
          (!isMobile || isCollapsed) && (
            <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
          )
        ) : (
          <nav
            className={cn(
              "w-full bg-transparent px-3 py-2",
              !isCollapsed && "p-0",
            )}
          >
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="text-muted-foreground h-6 w-6"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;