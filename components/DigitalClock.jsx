"use client";

import { useEffect, useMemo, useState } from "react";

export default function DigitalClock() {
  const [now, setNow] = useState(null);

  const formatters = useMemo(
    () => ({
      time: new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        hourCycle: "h23",
      }),
      date: new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      }),
    }),
    [],
  );

  useEffect(() => {
    function tick() {
      setNow(new Date());
    }

    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const timeText = now ? formatters.time.format(now) : "00:00:00";
  const dateText = now ? formatters.date.format(now) : "----년 --월 --일 --요일";

  return (
    <section className="w-full rounded-lg border border-emerald-200 bg-white/85 px-5 py-8 text-center shadow-xl shadow-emerald-950/10 backdrop-blur dark:border-emerald-800 dark:bg-black/70 dark:shadow-black/30">
      <time
        dateTime={now ? now.toISOString() : undefined}
        className="block font-mono text-5xl font-bold leading-none tracking-normal text-emerald-800 sm:text-7xl lg:text-8xl dark:text-emerald-300"
      >
        {timeText}
      </time>
      <p className="mt-4 font-mono text-sm font-semibold tracking-normal text-zinc-700 sm:text-base dark:text-emerald-100">
        {dateText}
      </p>
    </section>
  );
}
