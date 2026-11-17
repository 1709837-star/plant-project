/* 사진 올리기 */

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

    const formData = new FormData(); // JSON에는 파일을 못 넣기 때문에 formData
    formData.append("file", file);

    const res = await fetch(`/api/my-plants/${plantId}/photo`, {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    if (res.ok) router.refresh(); // 새 사진 보이게 페이지 다시 그리기
    else alert("사진 업로드에 실패했습니다");
  }

  return (
    <label className="inline-flex h-8 cursor-pointer items-center rounded-full bg-green-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-green-600">
      {loading ? "올리는 중..." : "📷 사진 올리기"}
      <input type="file" accept="image/*" onChange={onChange} className="hidden" />
    </label>
  );
}
