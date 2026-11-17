/* 물주기 버튼 */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WaterButton({ plantId }: { plantId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onWater() {
    setLoading(true);
    try {
      const res = await fetch(`/api/my-plants/${plantId}/waterings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        alert("물주기에 실패했습니다");
        return;
      }
      
      router.refresh(); // 목록 다시 불러서 D-day 갱신
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onWater}
      disabled={loading}
      className="inline-flex h-8 items-center rounded-full bg-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-green-600 disabled:opacity-50"
    >
      {loading ? "주는 중..." : "물주기"}
    </button>
  );
}
