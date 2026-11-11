// plant-front/app/species/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpeciesById } from "@/lib/api";
import BackButton from "@/components/common/BackButton";


type Params = { params: Promise<{ id: string }> };

const LIGHT_LABEL: Record<string, string> = {
  LOW: "낮은 광도",
  MEDIUM: "중간 광도",
  HIGH: "높은 광도",
};

export default async function SpeciesDetailPage({ params }: Params) {
  const { id } = await params;
  const species = await getSpeciesById(Number(id));

  // 없는 id면 404 페이지로 보내
  if (!species) notFound();

const seasons = [
    { label: "봄", img: species.waterSpringImg, note: species.waterSpringNote },
    { label: "여름", img: species.waterSummerImg, note: species.waterSummerNote },
    { label: "가을", img: species.waterAutumnImg, note: species.waterAutumnNote },
    { label: "겨울", img: species.waterWinterImg, note: species.waterWinterNote },
    ];

    // 범례는 이미지별로 한 번만 — 같은 이미지가 여러 계절에 나와도 1번만
const legendMap = new Map<string, string>();
seasons.forEach((s) => {
  if (s.img && s.note && !legendMap.has(s.img)) {
    legendMap.set(s.img, s.note);
  }
});
const legend = Array.from(legendMap, ([img, note]) => ({ img, note }));

  return (
    <main className="mx-auto max-w-2xl p-6">
      <BackButton label="← 목록으로"/>
        <div><br/></div>
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold">{species.name}</h1>
          <Link
            href={`/plants/new?speciesId=${species.id}`}
            className="shrink-0 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white"
          >
            + 내 정원에 추가
          </Link>
        </div>
      {species.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={species.imageUrl}
          alt={species.name}
          className="mt-6 w-full rounded-lg object-cover"
        />
      )}

      <section className="mt-6">
  <h2 className="text-lg font-bold">🔎 상세정보</h2>
  <dl className="mt-2 space-y-3 rounded border p-4">
    <div className="flex justify-between">
      <dt className="text-gray-500">분류</dt>
      <dd className="font-semibold">{species.category ?? "-"}</dd>
    </div>
    <div className="flex justify-between">
      <dt className="text-gray-500">생육형태</dt>
      <dd className="font-semibold">{species.growthForm ?? "-"}</dd>
    </div>
    <div className="flex justify-between">
      <dt className="text-gray-500">생장높이(cm)</dt>
      <dd className="font-semibold">{species.growthHeight ?? "-"}</dd>
    </div>
    <div className="flex justify-between">
      <dt className="text-gray-500">생장너비(cm)</dt>
      <dd className="font-semibold">{species.growthWidth ?? "-"}</dd>
    </div>
  </dl>
</section>

<section className="mt-6">
  <h2 className="text-lg font-bold">☘️ 관리정보</h2>
  <dl className="mt-2 space-y-3 rounded border p-4">
    <div className="flex justify-between">
      <dt className="text-gray-500">관리수준</dt>
      <dd className="font-semibold">{species.difficulty ?? "-"}</dd>
    </div>
    <div className="flex justify-between">
      <dt className="text-gray-500">광요구도</dt>
      <dd className="font-semibold">
        {species.lightLevel ? LIGHT_LABEL[species.lightLevel] ?? species.lightLevel : "-"}
      </dd>
    </div>
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-gray-500">배치장소</span>
      <span className="text-right font-semibold">
        {species.placement?.split("(")[0]}
        {species.placement?.includes("(") && (
          <span className="mt-1 block text-sm font-normal text-gray-500">
            ({species.placement.split("(")[1]}
          </span>
        )}
      </span>
    </div>
    <div className="flex justify-between">
      <dt className="text-gray-500">생육적온</dt>
      <dd className="font-semibold">{species.optimalTemp ?? "-"}</dd>
    </div>
    <div className="flex justify-between">
      <dt className="text-gray-500">습도</dt>
      <dd className="font-semibold">{species.humidity ?? "-"}</dd>
    </div>
    <div className="flex justify-between">
      <dt className="text-gray-500">겨울온도</dt>
      <dd className="font-semibold">
        {species.minWinterTemp !== null && species.minWinterTemp !== undefined
          ? `${species.minWinterTemp}°C 이상`
          : "-"}
      </dd>
    </div>
  </dl>
</section>

      {/* 위: 계절별 물주기 — 아이콘만 */}
<section className="mt-6">
  <h2 className="text-lg font-bold">💧 계절별 물주기</h2>
  <ul className="mt-2 grid grid-cols-4 gap-2 text-center">
    {seasons.map((s) => (
      <li key={s.label} className="rounded border p-3">
        <p className="text-sm text-gray-500">{s.label}</p>
        {s.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.img} alt={s.note ?? s.label} className="mx-auto mt-2 h-12" />
        ) : (
          <p className="mt-2">-</p>
        )}
      </li>
    ))}
  </ul>

  {/* 아래: 회색 배경 범례, 작은 폰트, 참고용 */}
  <div className="mt-3 rounded bg-gray-50 p-3 text-xs text-gray-600">
    <p className="mb-2 text-gray-400">* 아이콘별 물주기 방법</p>
    <ul className="space-y-1">
      {legend.map((item) => (
        <li key={item.img} className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.img} alt="" className="h-6" />
          <span>: {item.note}</span>
        </li>
      ))}
    </ul>
  </div>
</section>

      {species.sourceUrl && (
        <p className="mt-6 text-sm">
          <a
            href={species.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-green-700 underline"
          >
            농사로 원문 보기 →
          </a>
        </p>
      )}
    </main>
  );
}
