"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Logo } from "./Logo"
import { X } from "lucide-react"

type PolicyType = "privacy" | "terms" | null

const PDF_URLS = {
  privacy: "https://drive.google.com/file/d/1pDlY8FS3yLIHqa8TdBANJQZXnjwqyvvm/preview",
  terms: "https://drive.google.com/file/d/1pDlY8FS3yLIHqa8TdBANJQZXnjwqyvvm/preview",
}

const TITLES = {
  privacy: "About Me",
  terms: "Terms and Conditions",
}

export const Footer = () => {
  const [openPolicy, setOpenPolicy] = useState<PolicyType>(null)

  return (
    <>
      <footer className="bg-background dark:bg-dark z-50 flex w-full items-center justify-between p-4 md:px-8">
        <Logo />
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => setOpenPolicy("privacy")}
        >
          About me
        </Button>
      </footer>

      {openPolicy !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setOpenPolicy(null)}
        >
          <div
            className="bg-background relative flex h-[90vh] w-full max-w-4xl flex-col rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold">{TITLES[openPolicy]}</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setOpenPolicy(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative flex-1 overflow-hidden rounded-b-xl">
              <iframe
                src={PDF_URLS[openPolicy]}
                className="h-full w-full"
                title={TITLES[openPolicy]}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}