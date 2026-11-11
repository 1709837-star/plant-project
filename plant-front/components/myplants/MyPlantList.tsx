import type { MyPlant } from "@/lib/api";
import MyPlantListItem from "@/components/myplants/MyPlantListItem";
import Link from "next/link";

export default function MyPlantList({ plants }: { plants: MyPlant[] }) {
  if (plants.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">아직 등록한 식물이 없어요.</p>
        <Link
          href="/plants/new"
          className="mt-4 inline-block rounded bg-green-600 px-4 py-2 text-white"
        >
          + 내 식물 등록하러 가기
        </Link>
      </div>
    );
  }
  return (
    <ul className="space-y-3">
      {plants.map((p) => (
        <MyPlantListItem key={p.id} plant={p} />
      ))}
    </ul>
  );
}
