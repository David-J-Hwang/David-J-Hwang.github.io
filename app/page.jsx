import Image from "next/image";
import QuickLink from "../components/QuickLink";

const quickLinks = [
  {
    label: "YouTube",
    href: "https://youtube.com",
    className: "bg-red-600 text-white hover:bg-red-700",
  },
  {
    label: "Naver",
    href: "https://naver.com",
    className: "bg-[#03c75a] text-white hover:bg-[#02b351]",
  },
  {
    label: "Naver Maps",
    href: "https://map.naver.com",
    className: "bg-emerald-600 text-white hover:bg-emerald-700",
  },
  {
    label: "Naver Real Estate",
    href: "https://land.naver.com",
    className: "bg-lime-700 text-white hover:bg-lime-800",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    className:
      "border border-[#0d1117] bg-[#24292f] text-[#f6f8fa] hover:bg-[#0d1117] dark:border-zinc-500 dark:bg-[#f6f8fa] dark:text-[#0d1117] dark:hover:bg-white",
  },
  {
    label: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    className: "bg-sky-500 text-white hover:bg-sky-600",
  },
  {
    label: "Material UI",
    href: "https://mui.com/",
    className: "bg-blue-600 text-white hover:bg-blue-700",
  },
  {
    label: "유도명상",
    href: "https://youtu.be/DHNFYhNv81o",
    className: "bg-amber-500 text-zinc-950 hover:bg-amber-400",
  },
];

export default function HomePage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top_left,#d9f99d_0,#f7fbf7_34%,#eef7f1_100%)] px-5 py-10 dark:bg-[radial-gradient(circle_at_top_left,#14532d_0,#07110d_38%,#0d1712_100%)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
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
            <QuickLink href="/projects" variant="primary">
              Projects
            </QuickLink>
            <QuickLink href="/blog" variant="secondary">
              Blog
            </QuickLink>
          </div>
        </div>

        <div className="w-full max-w-md rounded-lg border border-emerald-200 bg-white/80 p-5 shadow-xl shadow-emerald-950/10 backdrop-blur dark:border-emerald-900 dark:bg-zinc-950/70 dark:shadow-black/30">
          <h2 className="text-base font-bold text-zinc-950 dark:text-white">
            Quick Links
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <QuickLink
                key={link.href}
                href={link.href}
                className={link.className}
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
