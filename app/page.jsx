import Image from "next/image";
import DigitalClock from "../components/DigitalClock";
import QuickLink from "../components/QuickLink";
import WeatherPanel from "../components/WeatherPanel";

const quickLinkClassName =
  "border border-zinc-200 bg-white text-zinc-900 hover:border-emerald-300 hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-emerald-700 dark:hover:bg-zinc-800";
const heroLinkClassName =
  "min-h-12 min-w-36 border border-emerald-600 bg-emerald-700 px-6 text-white shadow-lg shadow-emerald-900/20 hover:border-emerald-700 hover:bg-emerald-800 dark:border-emerald-300 dark:bg-emerald-400 dark:text-zinc-950 dark:shadow-emerald-950/40 dark:hover:border-emerald-200 dark:hover:bg-emerald-300";

const quickLinks = [
  {
    label: "YouTube",
    href: "https://youtube.com",
    accentClassName: "bg-red-600",
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
    label: "GitHub",
    href: "https://github.com",
    accentClassName: "bg-zinc-950 dark:bg-white",
  },
  {
    label: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    accentClassName: "bg-sky-500",
  },
  {
    label: "Material UI",
    href: "https://mui.com/",
    accentClassName: "bg-blue-600",
  },
  {
    label: "유도명상",
    href: "https://youtu.be/DHNFYhNv81o",
    accentClassName: "bg-amber-500",
  },
];

export default function HomePage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top_left,#d9f99d_0,#f7fbf7_34%,#eef7f1_100%)] px-5 py-10 dark:bg-[radial-gradient(circle_at_top_left,#14532d_0,#07110d_38%,#0d1712_100%)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="max-w-3xl">
          <div className="mb-7 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            <Image
              src="/light-bulb.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            Portfolio v2.0
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-zinc-950 sm:text-5xl lg:text-6xl dark:text-white">
            David J. Hwang
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Next.js와 Tailwind CSS로 다시 다듬는 개인 대표페이지입니다. 자주
            쓰는 링크, 프로젝트, 블로그를 한 곳에서 자연스럽게 이어주는 허브로
            만들어갑니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <QuickLink href="/projects" className={heroLinkClassName}>
              Projects
            </QuickLink>
            <QuickLink href="/blog" className={heroLinkClassName}>
              Blog
            </QuickLink>
          </div>
        </div>

        <DigitalClock />

        <WeatherPanel />

        <div className="w-full rounded-lg border border-emerald-200 bg-white/80 p-5 shadow-xl shadow-emerald-950/10 backdrop-blur dark:border-emerald-900 dark:bg-zinc-950/70 dark:shadow-black/30">
          <h2 className="text-base font-bold text-zinc-950 dark:text-white">
            Quick Links
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <QuickLink
                key={link.href}
                href={link.href}
                className={quickLinkClassName}
                accentClassName={link.accentClassName}
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
