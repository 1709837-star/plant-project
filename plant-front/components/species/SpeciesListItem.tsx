import Link from "next/link";
import type { Species } from "@/lib/api";

const LIGHT_LABEL: Record<string, string> = {
  LOW: "낮은 광도",
  MEDIUM: "중간 광도",
  HIGH: "높은 광도",
};

export default function SpeciesListItem({ species }: { species: Species }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded border p-4">
      <div className="min-w-0 flex-1">
        <p className="break-keep text-lg font-semibold">{species.name}</p>
        <p className="mt-1 break-keep text-sm text-gray-600">
          {species.difficulty ?? "난이도 없음"} · {LIGHT_LABEL[species.lightLevel ?? ""] ?? species.lightLevel} ·{" "}
          <span className="whitespace-nowrap"> 겨울 최저 {species.minWinterTemp}°C </span>
        </p>
      </div>
      {species.imageUrl ? (
        <img src={species.imageUrl} alt={species.name} className="h-20 w-20 shrink-0 rounded object-cover" />
      ) : (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-green-50 text-3xl">🌱</div>
      )}
    </li>
  );
}
