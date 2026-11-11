import type { WateringLog } from "@/lib/api";

export default function WateringLogList({ logs }: { logs: WateringLog[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">물주기 기록</h2>
      {logs.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">아직 물주기 기록이 없습니다</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {logs.map((log) => (
            <li key={log.id} className="flex items-center justify-between rounded border px-3 py-2 text-sm">
              <span>💧 {log.wateredDate}</span>
              <span className="text-gray-500">{log.memo ?? ""}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
