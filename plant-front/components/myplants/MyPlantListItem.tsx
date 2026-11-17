import Link from "next/link";
import type { MyPlant } from "@/lib/api";
import WaterButton from "@/components/myplants/WaterButton";
import DDayBadge from "./DDayBadge";

export default function MyPlantListItem({ plant }: { plant: MyPlant }) {
  return (
    <li className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* 사진 */}
      <Link href={`/plants/${plant.id}`}>
        {plant.photoUrl ? (
          <img src={`http://127.0.0.1:8080${plant.photoUrl}`} alt={plant.nickname} className="h-44 w-full rounded-2xl object-cover" />
        ) : (
          <div className="flex h-44 w-full items-center justify-center rounded-2xl bg-green-50 text-5xl">🌱</div>
        )}
      </Link>

      {/* D-day / 물주기 */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <DDayBadge dDay={plant.dDay} />
        <WaterButton plantId={plant.id} />
      </div>

      {/* 이름 / 다음 물주기 */}
      <Link href={`/plants/${plant.id}`} className="rounded-3xl border border-gray-100 bg-white p-4 text-center shadow-sm">
        <p className="break-keep text-lg font-semibold">{plant.nickname}</p>
        <p className="mt-1 break-keep text-sm text-gray-600">{plant.speciesName}</p>
        <p className="break-keep text-sm text-gray-600">{plant.location}</p>
        <p className="mt-1 text-sm text-gray-600">이전 💧 {plant.lastWateredDate}</p>
        <p className="mt-1 text-sm text-gray-600">다음 💧 {plant.nextWateringDate}</p>
      </Link>
    </li>
  );
}
