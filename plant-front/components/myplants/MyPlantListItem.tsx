import Link from "next/link";
import type { MyPlant } from "@/lib/api";
import WaterButton from "@/components/myplants/WaterButton";
import DDayBadge from "./DDayBadge";

export default function MyPlantListItem({ plant }: { plant: MyPlant }) {

  return (
    <li className="flex items-center justify-between gap-3 rounded border p-4">
      <Link href={`/plants/${plant.id}`} className="min-w-0 flex-1">
        <p className="break-keep text-lg font-semibold">{plant.nickname}</p>
        <p className="mt-1 break-keep text-sm text-gray-600">{plant.speciesName}</p>
        <p className="break-keep text-sm text-gray-600">{plant.location}</p>
        <p className="mt-1 text-sm text-gray-600">다음 💧 {plant.nextWateringDate}</p>
      </Link>
      <div className="flex shrink-0 flex-col items-end gap-2">
        {plant.photoUrl ? (
          <img src={`http://127.0.0.1:8080${plant.photoUrl}`} alt={plant.nickname} className="h-24 w-32 rounded object-cover" />
        ) : (
          <div className="flex h-24 w-32 items-center justify-center rounded bg-green-50 text-3xl">🌱</div>
        )}
        <div className="flex items-center gap-2">
          <DDayBadge dDay={plant.dDay} />
          <WaterButton plantId={plant.id} />
        </div>
      </div>
    </li>
  );
}
