/* << 페이지 번호 >> */

import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
};
// <SpeciesPagination
//      currentPage={currentPage}
//      totalPages={page.totalPages ?? 1}
//      buildHref={buildHref}
//    /> app/species/page.tsx가 계산해서 props로 넘겨줌


export default function SpeciesPagination({ currentPage, totalPages, buildHref }: Props) {
  if (totalPages <= 1) return null; // 검색 결과 페이지가 하나뿐이면 페이지네이션 안 그림

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-1">
      {currentPage > 0 && (
        <Link href={buildHref(currentPage - 1)} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-green-50" >
          ←
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          href={buildHref(i)}
          className={`rounded-full border px-3 py-1.5 text-sm shadow-sm ${
            i === currentPage
              ? "border-green-600 bg-green-600 text-white"
              : "border-gray-200 bg-white hover:bg-green-50"
          }`}
        >
          {i + 1}
        </Link>
      ))}
      {currentPage + 1 < totalPages && (
        <Link href={buildHref(currentPage + 1)} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-green-50" >
          →
        </Link>
      )}
    </div>
  );
}

// Array.from의 i는 인덱스 번호(0, 1, 2, ...)
// {i === currentPage ? ...} : 인덱스가 지금 보고 있는 페이지 번호면 이 css를 지정해라.