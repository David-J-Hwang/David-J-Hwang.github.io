import PaginatedProjects from "../../components/PaginatedProjects";

const projects = [
  {
    title: "goal-tree",
    description:
      "목표를 트리 구조로 정리하고 큰 목표를 작은 단계로 나누어 관리하는 프로젝트입니다.",
    href: "https://goal-tree-eight.vercel.app/",
  },
  {
    title: "Neumorphic Calculator",
    description:
      "Neumorphism 디자인을 적용한 계산기 프로젝트입니다. 환율, 단위, 날짜 계산 기능까지 확장할 예정입니다.",
    href: "https://david-j-hwang.github.io/neumorphic-calculator",
  },
  {
    title: "Footprint Korea",
    description: "한국 지도 기반으로 발자취를 기록하는 미니 프로젝트입니다.",
    href: "https://david-j-hwang.github.io/footprint-korea",
  },
  {
    title: "Overwatch Lucky Wheel",
    description: "오버워치 캐릭터를 무작위로 뽑는 럭키 휠 프로젝트입니다.",
    href: "https://david-j-hwang.github.io/overwatch-lucky-wheel",
  },
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
    title: "Get Weather",
    description: "도시를 검색해서 현재 날씨를 확인하는 날씨 미니 프로젝트입니다.",
    href: "https://get-weather.vercel.app",
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

        <PaginatedProjects projects={projects} />
      </div>
    </section>
  );
}
