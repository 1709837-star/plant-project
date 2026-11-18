/* << 도감 카드 한 장 >> */

import Link from "next/link";
import type { Species } from "@/lib/api";

// 번역표 : 스프링이 Low라는 코드를 주면 화면에는 "낮은 광도"로 나온다.
const LIGHT_LABEL: Record<string, string> = {
  LOW: "낮은 광도",
  MEDIUM: "중간 광도",
  HIGH: "높은 광도",
};

export default function SpeciesListItem({ species }: { species: Species }) {
  return (
    <li className="rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/species/${species.id}`} className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0 flex-1">
          <p className="break-keep text-base font-semibold">{species.name}</p>
          <p className="mt-1 break-keep text-sm text-gray-600">
            {species.difficulty ?? "난이도 없음"} · {LIGHT_LABEL[species.lightLevel ?? ""] ?? species.lightLevel} ·{" "}
            <span className="whitespace-nowrap">겨울 최저 {species.minWinterTemp}°C</span>
          </p>
        </div>
        {species.imageUrl ? (
          <img src={species.imageUrl} alt={species.name} className="h-20 w-20 rounded-2xl object-cover" />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-green-50 text-3xl">🌱</div>
        )}
      </Link>
    </li>
  );
}

