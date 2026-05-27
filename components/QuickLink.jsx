import Link from "next/link";

const variants = {
  primary: "bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300",
  secondary: "border border-emerald-700 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-400 dark:bg-transparent dark:text-emerald-200 dark:hover:bg-emerald-950",
};

export default function QuickLink({
  href,
  children,
  variant,
  accentClassName,
  className = "",
}) {
  const isExternal = href.startsWith("http");
  const baseClass =
    "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-md px-5 py-2.5 text-sm font-bold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950";
  const variantClass = variant ? variants[variant] : className;

  return (
    <Link
      href={href}
      className={`${baseClass} ${variantClass}`}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {accentClassName ? (
        <>
          <span
            aria-hidden="true"
            className={`h-2.5 w-2.5 rounded-full ${accentClassName}`}
          />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </Link>
  );
}
