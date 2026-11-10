import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

export default function SpeciesPagination({ currentPage, totalPages, buildHref }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-1">
      {currentPage > 0 && (
        <Link href={buildHref(currentPage - 1)} className="rounded border px-2 py-1 text-sm">
          ←
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          href={buildHref(i)}
          className={`rounded border px-2 py-1 text-sm ${
            i === currentPage ? "bg-green-600 text-white" : ""
          }`}
        >
          {i + 1}
        </Link>
      ))}
      {currentPage + 1 < totalPages && (
        <Link href={buildHref(currentPage + 1)} className="rounded border px-2 py-1 text-sm">
          →
        </Link>
      )}
    </div>
  );
}
