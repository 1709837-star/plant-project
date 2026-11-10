import Link from "next/link";

export default function SpeciesPagination({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (p: number) => string;
}) {
  if (totalPages <= 1) return null;
  const start = Math.floor(currentPage / 10) * 10;
  const pages = Array.from({ length: Math.min(10, totalPages - start) }, (_, i) => start + i);

  return (
    <div className="mt-6 flex items-center justify-center gap-1">
      {start > 0 ? (
        <Link href={buildHref(start - 1)} className="rounded border px-3 py-2">← Prev</Link>
      ) : (
        <span className="rounded border px-3 py-2 text-gray-300">← Prev</span>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={`rounded border px-3 py-2 ${p === currentPage ? "bg-green-600 font-bold text-white" : ""}`}
        >
          {p + 1}
        </Link>
      ))}
      {start + 10 < totalPages ? (
        <Link href={buildHref(start + 10)} className="rounded border px-3 py-2">Next →</Link>
      ) : (
        <span className="rounded border px-3 py-2 text-gray-300">Next →</span>
      )}
    </div>
  );
}
