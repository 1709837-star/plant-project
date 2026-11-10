"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePlantButton({ plantId }: { plantId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm("이 식물을 삭제할까요? 물주기 기록도 함께 지워집니다")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/my-plants/${plantId}`, { method: "DELETE" });
      if (!res.ok) {
        alert("삭제에 실패했습니다");
        return;
      }
      router.push("/plants");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onDelete}
      disabled={loading}
      className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
    >
      삭제
    </button>
  );
}
