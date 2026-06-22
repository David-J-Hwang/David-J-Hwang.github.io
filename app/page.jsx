import Image from "next/image";
import DigitalClock from "../components/DigitalClock";
import QuickLink from "../components/QuickLink";
import QuickLinksPanel from "../components/QuickLinksPanel";
import WeatherPanel from "../components/WeatherPanel";

const heroLinkClassName =
  "min-h-12 flex-1 border border-emerald-600 bg-emerald-700 px-4 text-white shadow-lg shadow-emerald-900/20 hover:border-emerald-700 hover:bg-emerald-800 sm:min-w-36 sm:flex-none sm:px-6 dark:border-emerald-300 dark:bg-emerald-400 dark:text-zinc-950 dark:shadow-emerald-950/40 dark:hover:border-emerald-200 dark:hover:bg-emerald-300";

export default function HomePage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top_left,#d9f99d_0,#f7fbf7_34%,#eef7f1_100%)] px-5 py-10 dark:bg-[radial-gradient(circle_at_top_left,#14532d_0,#07110d_38%,#0d1712_100%)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="max-w-3xl">
          <div className="mb-7 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            <Image
              src="/favicon.svg"
              alt="새싹"
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

          <div className="mt-8 flex gap-3 sm:flex-wrap">
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

        <QuickLinksPanel />
      </div>
    </section>
  );
}
