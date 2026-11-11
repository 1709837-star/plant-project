"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { MyPlant } from "@/lib/api";

export default function MyPlantEditForm({ plant }: { plant: MyPlant }) {
  const router = useRouter();
  const [nickname, setNickname] = useState(plant.nickname);
  const [location, setLocation] = useState(plant.location ?? "");
  const [wateringIntervalDays, setWateringIntervalDays] = useState(
    plant.wateringIntervalDays?.toString() ?? ""
  );
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
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <label className="block">
        <span className="text-sm text-gray-600">별명 *</span>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="text-sm text-gray-600">놓은 장소</span>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="text-sm text-gray-600">물주기 간격 (일)</span>
        <input
          type="number"
          min={1}
          value={wateringIntervalDays}
          onChange={(e) => setWateringIntervalDays(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="text-sm text-gray-600">마지막 물 준 날짜 *</span>
        <input
          type="date"
          value={lastWateredDate}
          onChange={(e) => setLastWateredDate(e.target.value)}
          required
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="text-sm text-gray-600">메모</span>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={5}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        disabled={loading}
        className="w-full rounded bg-green-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
      >
        {loading ? "저장 중..." : "저장하기"}
      </button>
    </form>
  );
}
