"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PhotoUpload({ plantId }: { plantId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`/api/my-plants/${plantId}/photo`, {
      method: "POST",
      body: formData,
    });
    setLoading(false);
    if (res.ok) router.refresh();
    else alert("사진 업로드에 실패했습니다");
  }

  return (
    <label className="inline-block cursor-pointer rounded border px-3 py-1.5 text-sm hover:bg-gray-50">
      {loading ? "올리는 중..." : "📷 사진 올리기"}
      <input type="file" accept="image/*" onChange={onChange} className="hidden" />
    </label>
  );
}
