import type { Species } from "@/lib/api";
import SpeciesListItem from "./SpeciesListItem";

export default function SpeciesList({ species }: { species: Species[] }) {
  if (species.length === 0) {
    return <p className="mt-8 text-gray-500">검색 결과가 없습니다.</p>;
  }
  return (
    <ul className="mt-6 space-y-3">
      {species.map((s) => (
        <SpeciesListItem key={s.id} species={s} />
      ))}
    </ul>
  );
}
