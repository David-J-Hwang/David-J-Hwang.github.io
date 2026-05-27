import QuickLink from "../../components/QuickLink";

const projects = [
  {
    title: "Blackjack",
    description: "새로 작업한 블랙잭 프로젝트로 이동합니다.",
    href: "https://david-j-hwang.github.io/blackjack",
  },
  {
    title: "Lucky Wheel",
    description: "새로 작업한 럭키 휠 프로젝트로 이동합니다.",
    href: "https://david-j-hwang.github.io/lucky-wheel",
  },
  {
    title: "Analog Clock",
    description: "기존 아날로그 시계 프로젝트입니다.",
    href: "https://david-j-hwang.github.io/analog-clock",
  },
  {
    title: "Digital Clock",
    description: "기존 디지털 시계 프로젝트입니다.",
    href: "https://david-j-hwang.github.io/digital-clock",
  },
];

export const metadata = {
  title: "Projects | David J. Hwang",
};

export default function ProjectsPage() {
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          Projects
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-zinc-950 dark:text-white">
          프로젝트 모음
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          대표페이지 안에 미니 프로젝트 코드를 직접 포함하기보다, 각 프로젝트
          페이지로 이동하는 허브 형태로 정리합니다.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.href}
              className="rounded-lg border border-emerald-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-900 dark:bg-zinc-950"
            >
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white">
                {project.title}
              </h2>
              <p className="mt-3 min-h-12 text-zinc-700 dark:text-zinc-300">
                {project.description}
              </p>
              <div className="mt-5">
                <QuickLink href={project.href} variant="secondary">
                  Visit Project
                </QuickLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
