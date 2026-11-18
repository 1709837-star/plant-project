/* 수정 폼 */
// 클라이언트 컴포넌트
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { MyPlant } from "@/lib/api";

export default function MyPlantEditForm({ plant }: { plant: MyPlant }) {
  // 등록 폼은 빈 칸으로 시작, 수정 폼은 기존 값을 미리 채워서 시작
  const router = useRouter();
  const [nickname, setNickname] = useState(plant.nickname);
  const [location, setLocation] = useState(plant.location ?? "");
  const [wateringIntervalDays, setWateringIntervalDays] = useState(
    plant.wateringIntervalDays?.toString() ?? ""
  );
  const [adoptedDate, setAdoptedDate] = useState(plant.adoptedDate ?? "");
  const [lastWateredDate, setLastWateredDate] = useState(plant.lastWateredDate);
  const [memo, setMemo] = useState(plant.memo ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/my-plants/${plant.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname,
          location: location || null,
          wateringIntervalDays: wateringIntervalDays
            ? Number(wateringIntervalDays)
            : null,
          adoptedDate: adoptedDate || null,
          lastWateredDate,
          memo: memo || null,
        }),
      });
      if (!res.ok) {
        setError("수정에 실패했습니다");
        return;
      }
      router.push(`/plants/${plant.id}`);
      router.refresh();
    } catch {
      setError("수정에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-700">별명</label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-green-100"
      />

      <label className="text-sm font-medium text-gray-700">놓은 장소</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-green-100"
      />

      <label className="text-sm font-medium text-gray-700">물주기 간격 (일)</label>
      <input
        type="number"
        value={wateringIntervalDays}
        onChange={(e) => setWateringIntervalDays(e.target.value)}
        className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-green-100"
      />

      <label className="text-sm font-medium text-gray-700">마지막 물 준 날짜</label>
      <input
        type="date"
        value={lastWateredDate}
        onChange={(e) => setLastWateredDate(e.target.value)}
        className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-green-100"
      />

      <label className="text-sm font-medium text-gray-700">입양일</label>
      <input
        type="date"
        value={adoptedDate}
        onChange={(e) => setAdoptedDate(e.target.value)}
        className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-green-100"
      />

      <label className="text-sm font-medium text-gray-700">메모</label>
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        rows={5}
        className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-green-100"
      />

      <div className="mt-2 flex gap-2">
        <button className="flex-1 rounded-full bg-green-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600">
          수정하기
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 rounded-full border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 shadow-sm"
        >
          취소
        </button>
      </div>
    </form>

  );
}
