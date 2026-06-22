"use client";

import { useState } from "react";
import QuickLink from "./QuickLink";

const PROJECTS_PER_PAGE = 4;
const PROJECT_CARD_CLASS =
  "flex min-h-52 flex-col rounded-lg border border-emerald-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-900 dark:bg-zinc-950";

export default function PaginatedProjects({ projects }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const visibleProjects = projects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE,
  );
  const emptySlots =
    totalPages > 1 ? PROJECTS_PER_PAGE - visibleProjects.length : 0;

  function moveToPage(nextPage) {
    setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages));
  }

  return (
    <>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <article
            key={project.href}
            className={PROJECT_CARD_CLASS}
          >
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white">
              {project.title}
            </h2>
            <p className="mt-3 min-h-12 text-zinc-700 dark:text-zinc-300">
              {project.description}
            </p>
            <div className="mt-auto pt-5">
              <QuickLink href={project.href} variant="secondary">
                Visit Project
              </QuickLink>
            </div>
          </article>
        ))}
        {Array.from({ length: emptySlots }, (_, index) => (
          <article
            key={`project-placeholder-${index}`}
            aria-hidden="true"
            className={`${PROJECT_CARD_CLASS} invisible pointer-events-none`}
          />
        ))}
      </div>

      {totalPages > 1 ? (
        <nav
          className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"
          aria-label="프로젝트 페이지"
        >
          <div aria-hidden="true" className="hidden sm:block" />
          <div className="flex flex-wrap justify-center gap-2">
            <PaginationButton
              ariaLabel="이전 페이지"
              disabled={currentPage === 1}
              onClick={() => moveToPage(currentPage - 1)}
            >
              {"<"}
            </PaginationButton>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isCurrent = currentPage === pageNumber;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => moveToPage(pageNumber)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-md border px-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 ${
                    isCurrent
                      ? "border-emerald-700 bg-emerald-700 text-white dark:border-emerald-300 dark:bg-emerald-400 dark:text-zinc-950"
                      : "border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-900 dark:bg-zinc-950 dark:text-emerald-200 dark:hover:bg-emerald-950"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <PaginationButton
              ariaLabel="다음 페이지"
              disabled={currentPage === totalPages}
              onClick={() => moveToPage(currentPage + 1)}
            >
              {">"}
            </PaginationButton>
          </div>
          <p className="text-center text-sm font-bold text-zinc-600 dark:text-zinc-300 sm:text-right">
            Page {currentPage} of {totalPages}
          </p>
        </nav>
      ) : null}
    </>
  );
}

function PaginationButton({ ariaLabel, children, disabled, onClick }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-md border border-emerald-200 bg-white px-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 dark:border-emerald-900 dark:bg-zinc-950 dark:text-emerald-200 dark:hover:bg-emerald-950 dark:focus:ring-offset-zinc-950"
    >
      {children}
    </button>
  );
}
