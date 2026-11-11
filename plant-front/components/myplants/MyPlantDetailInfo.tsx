import type { MyPlant } from "@/lib/api";
import DDayBadge from "@/components/myplants/DDayBadge";

export default function MyPlantDetailInfo({ plant }: { plant: MyPlant }) {
  return (
    <div className="mt-4 rounded border p-4 text-base">
      <div className="flex items-center justify-between py-1">
        <span className="text-gray-500">놓은 장소</span>
        <span className="font-medium">{plant.location}</span>
      </div>
      <div className="flex items-center justify-between py-1">
        <span className="text-gray-500">물주기 간격</span>
        <span className="font-medium">{plant.wateringIntervalDays}일</span>
      </div>
      <div className="flex items-center justify-between py-1">
        <span className="text-gray-500">마지막 물 준 날</span>
        <span className="font-medium">{plant.lastWateredDate}</span>
      </div>
      <div className="flex items-start justify-between gap-3 py-1">
        <span className="shrink-0 text-gray-500">다음 물주기</span>
        <span className="text-right font-medium">
          {plant.nextWateringDate}
          <span className="mt-1 block">
            <DDayBadge dDay={plant.dDay} />
          </span>
        </span>
      </div>
      <div className="border-t pt-3">
        <span className="text-gray-500">메모</span>
        <p className="mt-1 font-medium whitespace-pre-wrap break-words">{plant.memo ?? "메모가 없습니다"}</p>
      </div>
    </div>
  );
}
