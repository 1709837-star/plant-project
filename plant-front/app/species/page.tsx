/* 도감 목록 페이지 */
import { getSpecies } from "@/lib/api";
import SpeciesSearchBar from "@/components/species/SpeciesSearchBar";
import SpeciesList from "@/components/species/SpeciesList";
import SpeciesPagination from "@/components/species/SpeciesPagination";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ keyword?: string; light?: string; difficulty?: string; page?: string }>;
};

export default async function SpeciesPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Math.max(0, (Number(params.page ?? "1") || 1) - 1);
  const page = await getSpecies({ page: currentPage, size: 20 });

  const buildHref = (p: number) => {
    const q = new URLSearchParams();
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.light) q.set("light", params.light);
    if (params.difficulty) q.set("difficulty", params.difficulty);
    q.set("page", String(p + 1));
    return `/species?${q.toString()}`;
  };

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">식물 도감</h1>
        <Link
          href="/plants/new"
          className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
      + 내 식물 등록
      </Link>
      </div>
      <p className="mt-1 text-sm text-gray-500">
        실내정원용 식물 {page.totalElements}종
      </p>
      <SpeciesSearchBar keyword={params.keyword} light={params.light} />
      <SpeciesList species={page.content} />
      <SpeciesPagination
        currentPage={currentPage}
        totalPages={page.totalPages ?? 1}
        buildHref={buildHref}
      />
    </main>
  );
}
