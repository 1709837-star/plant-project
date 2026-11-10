import Link from "next/link";
import type { Species } from "@/lib/api";

const LIGHT_LABEL: Record<string, string> = {
  LOW: "낮은 광도",
  MEDIUM: "중간 광도",
  HIGH: "높은 광도",
};

export default function SpeciesListItem({ species }: { species: Species }) {
  return (
    <li className="rounded border p-4">
      <Link href={`/species/${species.id}`} className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold hover:underline">{species.name}</p>
          <p className="mt-1 text-sm text-gray-600">
            {species.difficulty ?? "난이도 없음"} ·{" "}
            {species.lightLevel ? LIGHT_LABEL[species.lightLevel] ?? species.lightLevel : "광도 없음"}
            {species.minWinterTemp != null ? ` · 겨울 최저 ${species.minWinterTemp}°C` : ""}
          </p>
        </div>
        {species.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={species.imageUrl} alt={species.name} className="h-20 w-20 shrink-0 rounded object-cover" />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-green-50 text-2xl">🌱</div>
        )}
      </Link>
    </li>
  );
}
