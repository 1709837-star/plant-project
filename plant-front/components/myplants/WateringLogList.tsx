/* 물주기 기록 */

import type { WateringLog } from "@/lib/api";
import DDayBadge from "@/components/myplants/DDayBadge";


export default function WateringLogList({ logs, dDay }: { logs: WateringLog[]; dDay?: number | null }) {
  // plants/[id]/page에서 waterings 넘겨줌
  return (
    <div className="mt-10">
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-lg font-semibold">물주기 기록</h2>
        {dDay !== undefined && dDay !== null && <DDayBadge dDay={dDay} />}
      </div>
      {logs.length === 0 ? (
        <p className="mt-2 text-center text-sm text-gray-500">아직 물주기 기록이 없습니다</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {logs.map((log) => (
            <li key={log.id} className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm shadow-sm">
              <span>💧 {log.wateredDate}</span>
              <span className="text-gray-500">{log.memo ?? ""}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
