"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Github, Linkedin, Mail, Code2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MadeByDisclaimer = () => (
  <div className="w-full max-w-md rounded-xl border border-dashed border-neutral-200 bg-neutral-50/80 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900/60">
    {/* Label */}
    <div className="mb-3 flex items-center justify-center gap-2">
      <Code2 className="h-3.5 w-3.5 text-violet-500" />
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-400">
        Disclaimer
      </p>
    </div>

    {/* Text */}
    <p className="mb-4 text-center text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
      This app is a personal project built &amp; maintained by{" "}
      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
        Ashish Yadav
      </span>
      , a Frontend Developer from Bengaluru 🇮🇳. It is not affiliated with
      Notion. Feel free to reach out or check out more of his work below.
    </p>

    {/* Contact buttons */}
    <div className="flex flex-wrap items-center justify-center gap-2">
      <a
        href="https://github.com/ITSASHISHGITHUB"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <Github className="h-3.5 w-3.5" />
          GitHub
        </Button>
      </a>

      <a
        href="https://linkedin.com/in/Ashishyadav677"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 border-blue-200 bg-blue-50 text-xs text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-900/40"
        >
          <Linkedin className="h-3.5 w-3.5" />
          LinkedIn
        </Button>
      </a>

      <a href="mailto:AY677204@GMAIL.COM">
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 border-orange-200 bg-orange-50 text-xs text-orange-700 hover:bg-orange-100 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400 dark:hover:bg-orange-900/40"
        >
          <Mail className="h-3.5 w-3.5" />
          Contact
        </Button>
      </a>
    </div>
  </div>
);

const DocumentsPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`),
    );

    toast.promise(promise, {
      loading: "Creating a new note....",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.svg"
        alt="empty"
        height="300"
        width="300"
        priority
        className="h-auto dark:hidden"
      />
      <Image
        src="/empty-dark.svg"
        alt="empty"
        height="300"
        width="300"
        priority
        className="hidden h-auto dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notion Ai
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>

      {/* Disclaimer */}
      <MadeByDisclaimer />
    </div>
  );
};

export default DocumentsPage;