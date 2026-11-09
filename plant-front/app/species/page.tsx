/* 도감 목록 페이지 */
import Link from "next/link";
import { getSpecies } from "@/lib/api";

type Props = {
  searchParams: Promise<{ keyword?: string; light?: string; difficulty?: string }>;
};

export default async function SpeciesPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = await getSpecies(params);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">식물 도감</h1>
      <p className="mt-1 text-sm text-gray-500">
        농사로에서 크롤링한 실내정원용 식물 {page.totalElements}종
      </p>

      <form className="mt-4 flex gap-2">
        <input
          name="keyword"
          defaultValue={params.keyword ?? ""}
          placeholder="식물 이름으로 검색"
          className="flex-1 rounded border px-3 py-2"
        />
        <select name="light" defaultValue={params.light ?? ""} className="rounded border px-2 py-2">
          <option value="">광도 전체</option>
          <option value="LOW">낮은 광도</option>
          <option value="MEDIUM">중간 광도</option>
          <option value="HIGH">높은 광도</option>
        </select>
        <button className="rounded bg-green-600 px-4 py-2 text-white">검색</button>
      </form>

      {page.content.length === 0 ? (
        <p className="mt-8 text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {page.content.map((s) => (
            <li key={s.id} className="rounded border p-4">
              <Link href={`/species/${s.id}`} className="text-lg font-semibold hover:underline">
                {s.name}
              </Link>
              <p className="mt-1 text-sm text-gray-600">
                {s.difficulty ?? "난이도 없음"} · {s.lightLevel ?? "광도 없음"}
                {s.minWinterTemp != null ? ` · 겨울 최저 ${s.minWinterTemp}°C` : ""}
              </p>
              {s.waterNote && <p className="mt-2 text-sm">{s.waterNote}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
