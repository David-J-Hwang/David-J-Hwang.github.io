export const metadata = {
  title: "Blog | David J. Hwang",
};

export default function BlogPage() {
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          Blog
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-zinc-950 dark:text-white">
          기록을 정리할 공간
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          v2.0에서는 먼저 홈과 프로젝트 라우트를 안정화하고, 이후 블로그의
          글 목록과 마크다운 작성 흐름을 차근차근 정리할 예정입니다.
        </p>
      </div>
    </section>
  );
}
