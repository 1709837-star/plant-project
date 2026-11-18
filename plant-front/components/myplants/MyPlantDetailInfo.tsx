import type { MyPlant } from "@/lib/api";
import DDayBadge from "@/components/myplants/DDayBadge";

export default function MyPlantDetailInfo({ plant }: { plant: MyPlant }) {
  // 내 식물 상세(app/plants/[id]/page.tsx)에서 plant를 통째로 넘겨줌
  return (
    <div className="mt-4 rounded-3xl border border-gray-100 bg-white p-4 text-base shadow-sm">
      <div className="flex items-center justify-between py-1">
        <span className="text-sm text-gray-500">놓은 장소</span>
        <span className="text-sm font-medium">{plant.location}</span>
      </div>
      <div className="flex items-center justify-between py-1">
        <span className="text-sm text-gray-500">물주기 간격</span>
        <span className="text-sm font-medium">{plant.wateringIntervalDays}일</span>
      </div>
      <div className="flex items-center justify-between py-1">
        <span className="text-sm text-gray-500">마지막 물 준 날</span>
        <span className="text-sm font-medium">{plant.lastWateredDate}</span>
      </div>
      <div className="flex items-center justify-between py-1">
        <span className="text-sm text-gray-500">다음 물주기</span>
        <span className="text-sm font-medium">{plant.nextWateringDate}</span>
      </div>
      <div className="border-t border-gray-100 pt-3">
        <span className="text-sm text-gray-500">메모</span>
        <p className="mt-1 text-sm whitespace-pre-wrap break-words">{plant.memo ?? "메모가 없습니다"}</p>
      </div>
    </div>
  );
}
