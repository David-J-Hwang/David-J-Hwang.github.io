"use client";

import { useId, useState } from "react";
import QuickLink from "./QuickLink";

const quickLinkClassName =
  "border border-zinc-200 bg-white text-zinc-900 hover:border-emerald-300 hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-emerald-700 dark:hover:bg-zinc-800";

const quickLinks = [
  {
    label: "쉬운성경",
    href: "https://www.godpia.com/",
    accentClassName: "bg-[#f01862]",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    accentClassName: "bg-red-600",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    accentClassName: "bg-zinc-950 dark:bg-white",
  },
  {
    label: "Naver",
    href: "https://naver.com",
    accentClassName: "bg-[#03c75a]",
  },
  {
    label: "Naver Maps",
    href: "https://map.naver.com",
    accentClassName: "bg-emerald-600",
  },
  {
    label: "Naver Real Estate",
    href: "https://land.naver.com",
    accentClassName: "bg-lime-700 dark:bg-lime-500",
  },
  {
    label: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    accentClassName: "bg-sky-500",
  },
  {
    label: "유도명상",
    href: "https://youtu.be/DHNFYhNv81o",
    accentClassName: "bg-amber-500",
  },
];

export default function QuickLinksPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const linksId = useId();

  return (
    <section className="w-full rounded-lg border border-emerald-200 bg-white/80 p-5 shadow-xl shadow-emerald-950/10 backdrop-blur dark:border-emerald-900 dark:bg-zinc-950/70 dark:shadow-black/30">
      <div className="flex min-h-10 items-center justify-between gap-4">
        <h2 className="text-base font-bold text-zinc-950 dark:text-white">
          Quick Links
        </h2>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={linksId}
          aria-label={isOpen ? "Quick Links 닫기" : "Quick Links 열기"}
          onClick={() => setIsOpen((current) => !current)}
          className="group flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-emerald-200 bg-white text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:border-emerald-900 dark:bg-zinc-950 dark:text-emerald-200 dark:hover:bg-emerald-950 dark:focus:ring-offset-zinc-950"
        >
          <ChevronIcon isOpen={isOpen} />
        </button>
      </div>

      <div
        id={linksId}
        aria-hidden={!isOpen}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin-top] duration-300 ease-out ${
          isOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div
            className={`grid grid-cols-1 gap-3 transition-transform duration-300 ease-out sm:grid-cols-2 lg:grid-cols-4 ${
              isOpen ? "translate-y-0" : "-translate-y-1"
            }`}
          >
            {quickLinks.map((link) => (
              <QuickLink
                key={link.href}
                href={link.href}
                className={quickLinkClassName}
                accentClassName={link.accentClassName}
                tabIndex={isOpen ? undefined : -1}
              >
                {link.label}
              </QuickLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChevronIcon({ isOpen }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-5 w-5 transition-transform duration-200 ease-out group-hover:scale-110 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <path
        fillRule="evenodd"
        d="M5.22 7.72a.75.75 0 0 1 1.06 0L10 11.44l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.78a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
