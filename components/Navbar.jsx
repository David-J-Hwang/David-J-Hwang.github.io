"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center border-b border-emerald-200 bg-white/90 backdrop-blur dark:border-emerald-900 dark:bg-zinc-950/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className="text-lg font-extrabold text-emerald-800 dark:text-emerald-300 sm:text-xl"
        >
          David J. Hwang
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-emerald-700 text-white dark:bg-emerald-400 dark:text-zinc-950"
                    : "text-zinc-700 hover:bg-emerald-100 hover:text-emerald-900 dark:text-zinc-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
