import Link from "next/link";
import type { MyPlant } from "@/lib/api";
import WaterButton from "@/components/myplants/WaterButton";
import DDayBadge from "./DDayBadge";

export default function MyPlantListItem({ plant }: { plant: MyPlant }) {
  return (
    <li className="rounded-3xl border border-gray-100 bg-white p-4 text-left shadow-sm">
      {/* 사진 */}
      <Link href={`/plants/${plant.id}`} className="block">
        {plant.photoUrl ? (
          <img
            src={`http://127.0.0.1:8080${plant.photoUrl}`}
            alt={plant.nickname}
            className="h-44 w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-44 w-full items-center justify-center rounded-2xl bg-green-50 text-5xl">
            🌱
          </div>
        )}
      </Link>

       {/* 이름 — 가운데 */}
        <Link href={`/plants/${plant.id}`} className="mt-4 block">
          <h2 className="text-center text-lg font-semibold">{plant.nickname}</h2>
        </Link>

        {/* 버튼 2개 — 가운데, 사진이랑 간격 띄움 */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <DDayBadge dDay={plant.dDay} />
          <WaterButton plantId={plant.id} />
        </div>

        {/* 밑에 정보 — 가운데 */}
        <Link href={`/plants/${plant.id}`} className="mt-2 block">
          <p className="text-center text-sm text-gray-500">
            {plant.speciesName}
            <span className="mx-2">/</span>
            {plant.location}
            <span className="mx-2">/</span>
            이전 💧 {plant.lastWateredDate}
          </p>
        </Link>
      </li>
  );
}
